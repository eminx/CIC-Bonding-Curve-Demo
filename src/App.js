import React, { useState } from 'react';
import {
  Box,
  Heading,
  Grommet,
  Form,
  FormField,
  RangeInput,
  Text,
} from 'grommet';
import { NumberInput } from 'grommet-controls';

const theme = {
  global: {
    colors: {
      brand: '#db2e9c',
      focus: 'none',
    },
    font: {
      size: '18px',
      height: '20px',
    },
  },
  formField: {
    border: false,
  },
  list: {
    item: {
      border: false,
    },
  },
};

const AppBar = (props) => (
  <Box
    tag="header"
    align="center"
    justify="between"
    background="dark-2"
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    style={{ zIndex: '1', textAlign: 'center' }}
    {...props}
  />
);

const defaultInitials = {
  reserve: 100000,
  supply: 400000,
  trr: 0.25,
};

function App() {
  const [initials, setInitials] = useState(defaultInitials);
  const [initMode, setInitMode] = useState(true);

  const setInitial = (initial) => {
    setInitials({ ...initials, ...initial });
  };

  const initialsUIProps = {
    initials,
    setInitial,
    initMode,
  };

  return (
    <Grommet theme={theme} themeMode="dark">
      <Box background="dark-1">
        <AppBar>
          <Heading level={2} textAlign="center">
            Interactive ABC Demo
          </Heading>
          <Text>ABC = Augmented Bonding Curve</Text>
        </AppBar>
        <Box alignSelf="center" width="xxlarge" pad="medium" direction="row">
          <InitialsUI {...initialsUIProps} />
        </Box>
      </Box>
    </Grommet>
  );
}

const InitialsUI = ({ initials, setInitial }) => (
  <Box width="40%">
    <Form>
      <Field
        name="reserve"
        label="Collateral Reserve"
        value={initials.reserve}
        onChange={(value) => setInitial({ reserve: value })}
        step={10}
        min={1000}
        max={1000000}
        thousandsSeparatorSymbol=" "
      />

      <Field
        name="supply"
        label="Supply of CIC Tokens"
        value={initials.supply}
        onChange={(value) => setInitial({ supply: value })}
        step={10}
        min={1000}
        max={1000000}
        thousandsSeparatorSymbol=" "
      />

      <Field
        name="trr"
        label="Target Reserve Ratio"
        value={initials.trr}
        onChange={(value) => setInitial({ trr: value })}
        step={0.05}
        min={0.05}
        max={1}
      />
    </Form>
  </Box>
);

const Field = ({ name, value, label, onChange, ...otherProps }) => {
  return (
    <FormField name={name} label={label} margin={{ bottom: 'large' }}>
      <Box direction="row" align="center">
        <Box width="50%" margin={{ right: 'small' }}>
          <NumberInput
            size="large"
            value={value}
            onChange={({ target: { value } }) => onChange(value)}
            {...otherProps}
          />
        </Box>
        <Box width="50%">
          <RangeInput
            value={value}
            onChange={({ target: { value } }) => onChange(value)}
            {...otherProps}
          />
        </Box>
      </Box>
    </FormField>
  );
};

export default App;
