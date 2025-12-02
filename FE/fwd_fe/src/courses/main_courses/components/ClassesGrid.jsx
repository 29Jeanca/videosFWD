import { Grid } from '@mui/material';
import ClassCard from './ClassCard';
import NoResults from './NoResults';

export default function ClassesGrid({ classes }) {
  return (
    <Grid container spacing={3}>
      {classes.length > 0 ? (
        classes.map((cls, i) => (
          <Grid item xs={12} md={6} xl={4} key={i}>
            <ClassCard {...cls} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <NoResults />
        </Grid>
      )}
    </Grid>
  );
}