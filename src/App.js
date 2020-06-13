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

const defaultValues = {
  reserve: 100,
  supply: 400,
  trr: 0.25,
};

function App() {
  const [reserve, setReserve] = useState(defaultValues.reserve);
  const [supply, setSupply] = useState(defaultValues.supply);
  const [trr, setTrr] = useState(defaultValues.trr);

  const handleChange = (event) => {
    console.log(event);
  };

  return (
    <Grommet theme={theme} themeMode="dark">
      <Box background="dark-1">
        <AppBar>
          <Heading level={2} textAlign="center">
            Interactive ABC Demo
          </Heading>
          <Text level={5}>ABC = Augmented Bonding Curve</Text>
        </AppBar>
        <Box alignSelf="center" width="xxlarge" pad="medium" direction="row">
          <Box width="40%">
            <Form
              onChange={(value) => console.log(value)}
              value={{ reserve: 221 }}
            >
              <FormField
                name="reserve"
                label="Collateral Reserve"
                margin={{ bottom: 'large' }}
              >
                <NumberInput
                  size="large"
                  value={reserve}
                  onChange={({ target: { value } }) => setReserve(value)}
                  step={10}
                  thousandsSeparatorSymbol=" "
                />
              </FormField>

              <FormField
                name="supply"
                label="Supply of CIC Tokens"
                margin={{ bottom: 'large' }}
              >
                <NumberInput
                  size="large"
                  value={supply}
                  onChange={({ target: { value } }) => setSupply(value)}
                  step={10}
                  thousandsSeparatorSymbol=" "
                />
              </FormField>

              <FormField
                name="trr"
                label="Target Reserve Ratio"
                margin={{ bottom: 'large' }}
              >
                <Box direction="row" align="center">
                  <Box width="40%" margin={{ right: 'small' }}>
                    <NumberInput
                      size="large"
                      value={trr}
                      onChange={({ target: { value } }) => setTrr(value)}
                      step={0.05}
                      min={0.05}
                      max={1}
                    />
                  </Box>
                  <Box width="60%">
                    <RangeInput
                      value={trr}
                      onChange={({ target: { value } }) => setTrr(value)}
                      step={0.05}
                      min={0.05}
                      max={1}
                      vertical
                    />
                  </Box>
                </Box>
              </FormField>
            </Form>
          </Box>
        </Box>
      </Box>
    </Grommet>
  );
}

export default App;
