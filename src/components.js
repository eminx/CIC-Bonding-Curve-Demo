import React from 'react';
import { Box, Text, FormField, RangeInput } from 'grommet';
import { NumberInput } from 'grommet-controls';
import { getPrice, getInvPrice, getCRR } from './config';

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

const InitialsUI = ({ initials, setInitial, large }) => {
  const { reserve, supply, trr } = initials;

  return (
    <Box size="large">
      <Box direction="row" justify="center" pad={{ top: 'medium' }}>
        <NumberDisplay
          value={getCRR(reserve, supply)}
          label="Reserve Ratio"
          color="dark-1"
          align="start"
        />
        <NumberDisplay
          value={getPrice(reserve, supply, trr)}
          label="Exchange Rate"
          color="dark-1"
          align="start"
        />
      </Box>
      <Field
        name="reserve"
        label="Collateral Reserve"
        value={reserve}
        onChange={(value) => setInitial({ reserve: value })}
        step={10}
        min={0}
        max={1000000}
        // thousandsSeparatorSymbol=" "
      />
      <Field
        name="supply"
        label="Supply of CIC Tokens"
        value={supply}
        onChange={(value) => setInitial({ supply: value })}
        step={10}
        min={0}
        max={1000000}
        // thousandsSeparatorSymbol=" "
      />

      <Field
        name="trr"
        label="Target Reserve Ratio"
        value={trr}
        onChange={(value) => setInitial({ trr: value })}
        step={0.05}
        min={0.05}
        max={1}
        decimals={2}
      />
    </Box>
  );
};

const PlayMonitor = ({ initials }) => {
  const { reserve, supply, trr } = initials;
  return (
    <Box size="small">
      <NumberDisplay
        value={reserve}
        label="Reserve"
        color="dark-1"
        align="start"
      />

      <NumberDisplay
        value={supply}
        label="Supply"
        color="dark-1"
        align="start"
      />


      <NumberDisplay
        value={getCRR(reserve, supply)}
        label="Current Reserve Ratio"
        color="dark-1"
        align="start"
      />

      <NumberDisplay
        value={trr}
        label="Target Reserve Ratio"
        color="dark-3"
        align="start"
      />


      <NumberDisplay
        value={getPrice(reserve, supply, trr)}
        label="CIC -> Reserve Rate"
        color="brand"
        align="start"
      />
      <NumberDisplay
        value={getInvPrice(reserve, supply, trr)}
        label="Reserve -> CIC Rate"
        color="complementary"
        align="start"
      />

      </Box>
  );
};

const Field = ({ name, value, label, onChange, ...otherProps }) => {
  return (
    <FormField name={name} label={label} margin={{ bottom: 'large' }}>
      <Box direction="row" align="center">
        <Box width="100%" margin={{ right: 'small' }}>
          <NumberInput
            size="large"
            value={value.toString()}
            decimals={0}
            onChange={({ target: { value } }) => onChange(Number(value))}
            {...otherProps}
          />
        </Box>
        <Box width="100%">
          <RangeInput
            value={value}
            onChange={({ target: { value } }) => onChange(Number(value))}
            {...otherProps}
          />
        </Box>
      </Box>
    </FormField>
  );
};

const NumberDisplay = ({
  align = 'end',
  color,
  label,
  size = 'xxlarge',
  value,
  ...otherProps
}) => (
  <Box {...otherProps} pad="small">
    <Box align={align}>
      {label && (
        <Text size="small" color={color}>
          {label}
        </Text>
      )}
      <Text size={size} color={color}>
        <code>{value}</code>
      </Text>
    </Box>
  </Box>
);

export { AppBar, Field, InitialsUI, PlayMonitor, NumberDisplay };
