import classes from './Loading.module.scss';

const Loading: React.FC = () => (
  <div className={classes.loading}>
    <div className={classes['lds-dual-ring']}></div>
  </div>
);

export default Loading;
