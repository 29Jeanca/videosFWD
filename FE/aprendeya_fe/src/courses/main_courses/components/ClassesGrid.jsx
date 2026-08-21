import { Grid } from '@mui/material';
import ClassCard from './ClassCard';
import NoResults from './NoResults';

export default function ClassesGrid({ classes, onClearFilters }) {
  return (
    <Grid container spacing={2.5}>
      {classes.length > 0 ? (
        classes.map((cls, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <ClassCard {...cls} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <NoResults onClearFilters={onClearFilters} />
        </Grid>
      )}
    </Grid>
  );
}