import React, { useState } from 'react';
import {
  Button,
  Box,
  Heading,
  Image,
  Grommet,
  Form,
  FormField,
  RangeInput,
  Text,
  base,
} from 'grommet';
import { deepMerge } from 'grommet/utils';
import { NumberInput } from 'grommet-controls';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  // LineChart,
  // Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
} from 'recharts';
import { Atm, Money } from 'grommet-icons';

const theme = deepMerge(base, {
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
});

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

const defaultInitials = {
  reserve: 1000,
  supply: 4000,
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

const defaultPriceSetItem = {
  step: 0,
  price: getPrice(
    defaultInitials.reserve,
    defaultInitials.supply,
    defaultInitials.trr
  ),
},

function App() {
  const [initials, setInitials] = useState(defaultInitials);
  const [playMode, setPlayMode] = useState(false);
  const [amount, setAmount] = useState(50);
  const [priceSet, setPriceSet] = useState([defaultPriceSetItem]);

  const setInitial = (initial) => {
    setInitials({ ...initials, ...initial });
  };

  const cashIn = (amount) => {
    const newReserve = initials.reserve + amount;
    const newSupply = initials.supply - amount;
    setInitials({ reserve: newReserve, supply: newSupply, trr: initials.trr });
    setPriceSet([
      ...priceSet,
      {
        price: getPrice(newReserve, newSupply, initials.trr),
        step: priceSet.length,
      },
    ]);
  };

  const cashOut = (amount) => {
    const newReserve = initials.reserve - amount;
    const newSupply = initials.supply + amount;
    setInitials({ reserve: newReserve, supply: newSupply, trr: initials.trr });
    setPriceSet([
      ...priceSet,
      {
        price: getPrice(newReserve, newSupply, initials.trr),
        step: priceSet.length,
      },
    ]);
  };

  const changePlayMode = () => {
    if (playMode) {
      setPlayMode(false);
      setInitials(defaultInitials);
      setPriceSet([defaultPriceSetItem]);
    } else {
      setPlayMode(true);
    }
  };

  const initialsUIProps = {
    initials,
    setInitial,
    playMode,
  };

  return (
    <Grommet theme={theme}>
      <Box background="light-1" height="100%">
        <AppBar direction="row">
          <Image
            width="180px"
            src="https://static.wixstatic.com/media/ce30dd_833dabd658664e039a2b4504f4993a91~mv2.png/v1/fill/w_292,h_80,al_c,q_85,usm_0.66_1.00_0.01/ce30dd_833dabd658664e039a2b4504f4993a91~mv2.webp"
          />
          <Box>
            <Heading level={2} textAlign="center">
              CIC Bonding Curve Demo
            </Heading>
            <Text>CIC = Community Inclusion Currency</Text>
          </Box>
          <Box width="180px" height="10px" />
        </AppBar>
        <Box width="100%" pad="medium" direction="row" justify="center">
          <Box
            width={playMode ? 'medium' : 'large'}
            animation={playMode ? 'slideLeft' : 'fadeIn'}
          >
            <InitialsUI {...initialsUIProps} />
            <Button
              primary={!playMode}
              label={playMode ? 'Reset Initials' : 'Start Playing'}
              onClick={() => changePlayMode()}
            />
          </Box>

          {playMode && (
            <Box width="70%" pad="medium" animation="zoomIn">
              <Box
                direction="row"
                width="large"
                height="60px"
                gap="small"
                justify="center"
                align="center"
              >
                <Box width="small" align="center" pad="xsmall">
                  <NumberInput
                    size="xlarge"
                    value={amount}
                    step={5}
                    min={1}
                    max={100}
                    onChange={({ target: { value } }) =>
                      setAmount(Number(value))
                    }
                  />
                </Box>
                <Box
                  width="xsmall"
                  onClick={() => cashIn(amount)}
                  align="center"
                  hoverIndicator="light-2"
                  pad="xsmall"
                >
                  <Atm />
                  <Text size="small">CASH IN</Text>
                </Box>
                <Box
                  width="xsmall"
                  onClick={() => cashOut(amount)}
                  align="center"
                  hoverIndicator="light-2"
                  pad="xsmall"
                >
                  <Money />
                  <Text size="small">CASH OUT</Text>
                </Box>
              </Box>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                  width="100%"
                  height={400}
                  data={priceSet}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="1 3" />
                  <XAxis dataKey="step">
                    <Label
                      value="conversions"
                      offset={0}
                      position="insideBottomRight"
                    />
                  </XAxis>
                  <YAxis>
                    <Label value="price" offset={0} position="insideTopLeft" />
                  </YAxis>
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#db2e9c"
                    strokeWidth={2}
                    fill="#f7b7dc"
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
      min={0}
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
      min={0}
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

export default App;
