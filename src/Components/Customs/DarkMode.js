import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import '../../Styles/DarkMode.css';

export default function DarkMode(props) {
  const [checked, setChecked] = React.useState(false);
  const {darkMode,toggleDarkMode} = props;


  const toggleChecked = () => {
    setChecked((prev) => !prev);
    toggleDarkMode();
  };

  return (
    <FormGroup class = 'DarkMode-container'>
      <FormControlLabel
        control={<Switch size="small" checked={checked} color = "primary" onChange={toggleChecked} />}
        label="Dark Mode"
        labelPlacement = "start"
      />
    </FormGroup>
  );
}
