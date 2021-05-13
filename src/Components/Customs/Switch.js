import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import '../../Styles/Switch.css'
import FormControlLabel from '@material-ui/core/FormControlLabel';


export default function SwitchesSize(props) {
    const {setFlippedState} = props;
    const [checked, setChecked] = React.useState(false);

  const toggleChecked = () => {
    setFlippedState(!checked);
    setChecked(!checked);
  };

  return (
      <div class = 'switch-container'>
        <div class = 'switch-label'>Show Weights</div>
        <FormControlLabel class = 'switch-main'
          control={<Switch size="small" checked={checked} onChange={toggleChecked} />}
          // label="Weights"
          labelPlacement="top"
        />

      </div>
     
  );
}
