import React, { useState } from 'react';
import {
  Button,
  Box,
  Heading,
  Grommet,
  Form,
  FormField,
  RangeInput,
  Text,
} from 'grommet';
import { NumberInput } from 'grommet-controls';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Area,
} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

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

const getPrice = (reserve, supply, trr) => {
  // [reserve, supply, trr].forEach((item) => {
  //   if (!isNaN(item)) {
  //     alert(`${item} is not a number!`);
  //     return;
  //   }
  // });

  const price = reserve / (supply * trr);
  return price.toFixed(2);
};

function App() {
  const [initials, setInitials] = useState(defaultInitials);
  const [playMode, setPlayMode] = useState(false);
  const [amount, setAmount] = useState(50);
  const [priceSet, setPriceSet] = useState([
    {
      step: 1,
      price: getPrice(
        defaultInitials.reserve,
        defaultInitials.supply,
        defaultInitials.trr
      ),
    },
  ]);

  const setInitial = (initial) => {
    setInitials({ ...initials, ...initial });
  };

  const cashIn = (amount) => {
    const newSupply = initials.supply + amount;
    const newReserve = initials.reserve - amount;
    setInitials({ supply: newSupply, reserve: newReserve, trr: initials.trr });
    setPriceSet([
      ...priceSet,
      {
        price: getPrice(newSupply, newReserve, initials.trr),
        step: priceSet.length + 2,
      },
    ]);
  };

  const cashOut = (amount) => {
    const newSupply = initials.supply - amount;
    const newReserve = initials.reserve + amount;
    setInitials({ supply: newSupply, reserve: newReserve, trr: initials.trr });
    setPriceSet([
      ...priceSet,
      {
        price: getPrice(newSupply, newReserve, initials.trr),
        step: priceSet.length + 2,
      },
    ]);
  };

  const initialsUIProps = {
    initials,
    setInitial,
    playMode,
  };

  return (
    <Grommet theme={theme}>
      <Box background="light-1">
        <AppBar>
          <Heading level={2} textAlign="center">
            Interactive ABC Demo
          </Heading>
          <Text>ABC = Augmented Bonding Curve</Text>
        </AppBar>
        <Box width="100%" pad="medium" direction="row" justify="center">
          <Box width={playMode ? 'medium' : 'large'}>
            <InitialsUI {...initialsUIProps} />
            <Button
              primary={!playMode}
              label={playMode ? 'Reset Initials' : 'Start Playing'}
              onClick={() => setPlayMode(!playMode)}
            />
          </Box>

          {playMode && (
            <Box width="70%" pad="medium">
              <Box direction="row" width="medium" height="50px" gap="xsmall">
                <Box
                  width="xxsmall"
                  background="dark-1"
                  onClick={() => cashIn(50)}
                />
                <Box
                  width="xxsmall"
                  background="dark-1"
                  onClick={() => cashOut(50)}
                />
              </Box>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                  data={priceSet}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <XAxis dataKey="step">
                    <Label
                      value="CONVERSIONS"
                      offset={-20}
                      position="insideBottom"
                    />
                  </XAxis>
                  <YAxis>
                    <Label value="CIC PRICE VALUE" offset={0} position="left" />
                  </YAxis>
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          )}
        </Box>
      </Box>
    </Grommet>
  );
}

const InitialsUI = ({ initials, setInitial, playMode }) => (
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
      playMode={playMode}
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
      playMode={playMode}
    />
  </Form>
);

const Field = ({ name, value, label, onChange, playMode, ...otherProps }) => {
  return (
    <FormField name={name} label={label} margin={{ bottom: 'large' }}>
      <Box direction="row" align="center">
        <Box width="100%" margin={{ right: 'small' }}>
          <NumberInput
            size="large"
            value={value}
            disabled={playMode}
            onChange={({ target: { value } }) => onChange(value)}
            {...otherProps}
          />
        </Box>
        {!playMode && (
          <Box width="100%">
            <RangeInput
              value={value}
              onChange={({ target: { value } }) => onChange(value)}
              {...otherProps}
            />
          </Box>
        )}
      </Box>
    </FormField>
  );
};

export default App;
