import React from 'react';
import { Box, Text, FormField, RangeInput } from 'grommet';
import { NumberInput } from 'grommet-controls';
import { setInitCICBal, setInitResBal, getPrice, getCRR } from './config';

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
      <Box direction="row" justify="center" gap="medium" pad="small">
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
      <InitialField
        name="reserve"
        label="Contribute National Currency Collateral"
        value={reserve}
        onChange={(value) =>
          setInitial({ reserve: value, resBal: setInitResBal(value) })
        }
        step={10}
        min={0}
        max={1000000}
        large={large}
      />
      <InitialField
        name="supply"
        label="Create a supply of CIC Tokens"
        value={supply}
        onChange={(value) =>
          setInitial({ supply: value, cicBal: setInitCICBal(value) })
        }
        step={10}
        min={0}
        max={1000000}
        large={large}
      />

      <InitialField
        name="trr"
        label="Target Reserve Ratio"
        value={trr}
        onChange={(value) => setInitial({ trr: value })}
        step={0.05}
        min={0.01}
        max={1}
        decimals={2}
        large={large}
      />
    </Box>
  );
};

const PlayMonitor = ({ initials }) => {
  const { reserve, supply, trr } = initials;
  return (
    <Box size="small" gap="medium" pad="medium">
      <NumberDisplay
        value={reserve}
        label="National Currency Reserve"
        color="complementary"
        align="start"
      />

      <NumberDisplay
        value={supply}
        label="CIC Supply"
        color="brand"
        align="start"
	  />
	  {/*

      <NumberDisplay
        value={getCRR(reserve, supply)}
        label="Current Reserve Ratio"
        color="complementary"
        align="start"
      />

      <NumberDisplay
        value={trr}
        label="Target Reserve Ratio"
        color="dark-3"
        align="start"
      />
     */}
    </Box>
  );
};

const InitialField = ({
  name,
  value,
  label,
  onChange,
  large,
  ...otherProps
}) => {
  return (
    <FormField name={name} label={label} margin={{ bottom: 'medium' }}>
      <Box direction="row" align="center">
        <Box basis="100%" margin={{ right: 'small' }}>
          <NumberInput
            size="large"
            value={value.toString()}
            decimals={0}
            onChange={({ target: { value } }) => onChange(Number(value))}
            {...otherProps}
          />
        </Box>
        {large && (
          <Box basis="100%">
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

const NumberDisplay = ({
  align = 'end',
  color = 'dark-1',
  label,
  size = 'xxlarge',
  value,
  alignLabelRight,
  inline,
  ...otherProps
}) => (
  <Box direction={inline ? 'row' : 'column'} {...otherProps}>
    {label && (
      <Text
        size="small"
        color={color}
        style={{
          textAlign: alignLabelRight ? 'right' : 'left',
          paddingRight: 4,
        }}
      >
        {label}{' '}
      </Text>
    )}
    <Text size={size} color="dark-2">
      <code>{value}</code>
    </Text>
  </Box>
);

const TextDisplay = ({
  align = 'end',
  color = 'dark-1',
  label,
  size = 'xxlarge',
  alignLabelRight,
  inline,
  ...otherProps
}) => (
  <Box direction={inline ? 'row' : 'column'} {...otherProps}>
    {label && (
      <Text
        size="small"
        color={color}
        style={{
          textAlign: alignLabelRight ? 'right' : 'left',
          paddingRight: 4,
        }}
      >
        {label}{' '}
      </Text>
    )}
  </Box>
);


export { AppBar, InitialField, InitialsUI, PlayMonitor, NumberDisplay, TextDisplay };
