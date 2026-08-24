import re
import sys
from pathlib import Path

EXCLUDE_DIRS = {'.git', 'node_modules', '__pycache__'}

JS_EXTS = {'.js', '.jsx', '.ts', '.tsx'}
CSS_EXTS = {'.css'}
HTML_EXTS = {'.html'}
PY_EXTS = {'.py'}

def should_skip(path: Path):
    for part in path.parts:
        if part in EXCLUDE_DIRS:
            return True
    return False

def process_py(text: str) -> str:
    out_lines = []
    for line in text.splitlines():
        stripped = line.lstrip()
        if stripped.startswith('#'):
            continue
        out_lines.append(line)
    return '\n'.join(out_lines) + ('\n' if text.endswith('\n') else '')

def process_js_like(text: str, block_start='/*', block_end='*/', line_mark='//') -> str:
    out_lines = []
    in_block = False
    for line in text.splitlines():
        s = line.lstrip()
        if not in_block and line_mark and s.startswith(line_mark):
            continue
        if not in_block and s.startswith(block_start):
            if block_end in s:
                continue
            in_block = True
            continue
        if in_block:
            if block_end in line:
                in_block = False
            continue
        out_lines.append(line)
    return '\n'.join(out_lines) + ('\n' if text.endswith('\n') else '')

def process_html(text: str) -> str:
    out_lines = []
    in_block = False
    for line in text.splitlines():
        s = line.lstrip()
        if not in_block and s.startswith('<!--'):
            if '-->' in s:
                continue
            in_block = True
            continue
        if in_block:
            if '-->' in line:
                in_block = False
            continue
        out_lines.append(line)
    return '\n'.join(out_lines) + ('\n' if text.endswith('\n') else '')

def main(root: Path):
    modified = []
    for p in root.rglob('*'):
        if p.is_dir():
            continue
        if should_skip(p.relative_to(root)):
            continue
        ext = p.suffix.lower()
        try:
            if ext in PY_EXTS or ext in JS_EXTS or ext in CSS_EXTS or ext in HTML_EXTS:
                text = p.read_text(encoding='utf-8')
            else:
                continue
        except Exception:
            continue

        new = None
        if ext in PY_EXTS:
            new = process_py(text)
        elif ext in JS_EXTS:
            new = process_js_like(text, block_start='/*', block_end='*/', line_mark='//')
        elif ext in CSS_EXTS:
            new = process_js_like(text, block_start='/*', block_end='*/', line_mark='')
        elif ext in HTML_EXTS:
            new = process_html(text)

        if new is not None and new != text:
            p.write_text(new, encoding='utf-8')
            modified.append(str(p.relative_to(root)).replace('\\','/'))

    print(f"Modified {len(modified)} files")
    for m in modified:
        print(m)

if __name__ == '__main__':
    root = Path('.')
    if len(sys.argv) > 1:
        root = Path(sys.argv[1])
    main(root)
