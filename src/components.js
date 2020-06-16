import React from 'react';
import { Box, Form, FormField, RangeInput } from 'grommet';
import { NumberInput } from 'grommet-controls';

const AppBar = (props) => (
  <Box
    tag="header"
    align="center"
    justify="between"
    background="light-2"
    pad={{ left: 'small', right: 'small' }}
    style={{ zIndex: '1', textAlign: 'center' }}
    {...props}
  />
);

const InitialsUI = ({ initials, setInitial, playMode }) => (
  <Form>
    <Field
      name="reserve"
      label="Collateral Reserve"
      value={initials.reserve}
      onChange={(value) => setInitial({ reserve: value })}
      step={10}
      min={0}
      max={1000000}
      // thousandsSeparatorSymbol=" "
      playMode={playMode}
    />

    <Field
      name="supply"
      label="Supply of CIC Tokens"
      value={initials.supply}
      onChange={(value) => setInitial({ supply: value })}
      step={10}
      min={0}
      max={1000000}
      // thousandsSeparatorSymbol=" "
      playMode={playMode}
    />

    <Field
      name="trr"
      label="Target Reserve Ratio"
      value={initials.trr}
      onChange={(value) => setInitial({ trr: value })}
      step={0.05}
      min={0.05}
      max={1}
      decimals={2}
      playMode={playMode}
    />
  </Form>
);

const Field = ({ name, value, label, onChange, playMode, ...otherProps }) => {
  console.log(value, typeof value);
  return (
    <FormField name={name} label={label} margin={{ bottom: 'large' }}>
      <Box direction="row" align="center">
        <Box width="100%" margin={{ right: 'small' }}>
          <NumberInput
            size="large"
            value={value.toString()}
            decimals={0}
            disabled={playMode}
            onChange={({ target: { value } }) => onChange(Number(value))}
            {...otherProps}
          />
        </Box>
        {!playMode && (
          <Box width="100%">
            <RangeInput
              value={value}
              onChange={({ target: { value } }) => onChange(Number(value))}
              {...otherProps}
            />
          </Box>
        )}
      </Box>
    </FormField>
  );
};

export { AppBar, Field, InitialsUI };
