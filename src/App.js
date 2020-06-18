import React, { useState } from 'react';
import { Button, Box, Heading, Image, Grommet, Text } from 'grommet';
import { NumberInput } from 'grommet-controls';
import {
  ResponsiveContainer,
  ComposedChart,
  // Bar,
  Legend,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
} from 'recharts';
import { Atm, Money } from 'grommet-icons';
import { Container, Row, Col, ScreenClassRender } from 'react-grid-system';

import theme from './config/theme';
import { AppBar, InitialsUI, NumberDisplay } from './components';
import {
  getNewSupplyCashIn,
  getNewReserveCashOut,
  getPrice,
  getCRR,
  defaultInitials,
  defaultAmount,
  defaultPriceSetItem,
} from './config';

function App() {
  const [initials, setInitials] = useState(defaultInitials);
  const [playMode, setPlayMode] = useState(false);
  const [amount, setAmount] = useState(defaultAmount);
  const [priceSet, setPriceSet] = useState([defaultPriceSetItem]);

  const setInitial = (initial) => {
    setInitials({ ...initials, ...initial });
  };

  const cashIn = (amount) => {
    const { reserve, supply, trr } = initials;
    const newReserve = reserve + amount;
    const newSupply = getNewSupplyCashIn(reserve, supply, trr, amount);
    const newCRR = newReserve/newSupply;
      setInitials({ reserve: newReserve, supply: newSupply, trr: initials.trr, crr: newCRR });
    setPriceSet([
      ...priceSet,
      {
        price: getPrice(newReserve, newSupply, trr),
        step: priceSet.length,
      },
    ]);
  };

  const cashOut = (amount) => {
    const { reserve, supply, trr } = initials;
    const newReserve = getNewReserveCashOut(reserve, supply, trr, amount)
    const newSupply = supply - amount;
    const newCRR = newReserve/newSupply;
      setInitials({ reserve: newReserve, supply: newSupply, trr: initials.trr, crr: newCRR });
    setPriceSet([
      ...priceSet,
      {
        price: getPrice(newReserve, newSupply, initials.trr),
        step: priceSet.length,
      },
    ]);
  };

  const changePlayMode = () => {
    const { reserve, supply, trr } = initials;
    if (playMode) {
      setPlayMode(false);
      setInitials(defaultInitials);
      setPriceSet([defaultPriceSetItem]);
      setAmount(defaultAmount);
    } else {
      setPriceSet([
        {
          price: getPrice(reserve, supply, trr),
          step: 0,
        },
      ]);
      setPlayMode(true);
    }
  };

  const initialsUIProps = {
    initials,
    setInitial,
    playMode,
  };

  const reservePrice = priceSet[priceSet.length - 1].price;
  const cicPrice = (1 / reservePrice).toFixed(2);

  const priceSetWithCicPrices = priceSet.map((item) => ({
    ...item,
    cicPrice: (1 / item.price).toFixed(2),
    priceDifference: (1 / item.price - item.price).toFixed(2),
  }));

  return (
    <Grommet theme={theme}>
      <ScreenClassRender
        render={(screenClass) => {
          const large = ['lg', 'xl'].includes(screenClass);
          return (
            <Box background="light-1" height="100%" width="100%">
              <Container fluid style={{ width: '100%' }}>
                <AppBar direction="row">
                  <Row justify="center" style={{ width: '100%' }}>
                    <Col lg={3}>
                      <Image
                        width="180px"
                        src="https://static.wixstatic.com/media/ce30dd_833dabd658664e039a2b4504f4993a91~mv2.png/v1/fill/w_292,h_80,al_c,q_85,usm_0.66_1.00_0.01/ce30dd_833dabd658664e039a2b4504f4993a91~mv2.webp"
                      />
                    </Col>
                    <Col lg={6}>
                      <Box>
                        <Heading level={2} textAlign="center">
                          CIC Bonding Curve Demo
                        </Heading>
                        <Text>CIC = Community Inclusion Currency</Text>
                      </Box>
                    </Col>
                    <Col lg={3}>
                      <Box width="180px" height="10px" />
                    </Col>
                  </Row>
                </AppBar>

                <Row justify="center">
                  <Col lg={playMode ? 3 : 12}>
                    <Box
                      width={playMode ? 'small' : 'large'}
                      style={{ margin: '0 auto' }}
                      animation={playMode ? 'slideLeft' : 'fadeIn'}
                      pad={{ bottom: 'xlarge' }}
                    >
                      <InitialsUI {...initialsUIProps} large={large} />
                      <Button
                        primary={!playMode}
                        label={playMode ? 'Reset' : 'Start'}
                        onClick={() => changePlayMode()}
                      />
                    </Box>
                  </Col>

                  {playMode && (
                    <Col lg={9}>
                      <Box
                        animation="zoomIn"
                        pad={{ top: 'medium', bottom: 'medium' }}
                      >
                        <Box
                          direction="row"
                          width="100%"
                          // height="60px"
                          gap="small"
                          justify="between"
                          align="center"
                        >
                          <Box
                            direction={large ? 'row' : 'column'}
                            align="center"
                            gap="small"
                          >
                            <Box width="small" align="center" pad="xsmall">
                              <NumberInput
                                size="xlarge"
                                value={amount.toString()}
                                decimals={0}
                                step={100}
                                min={1}
                                max={initials.reserve}
                                onChange={({ target: { value } }) =>
                                  setAmount(Number(value))
                                }
                              />
                            </Box>
                            <Box gap="xsmall">
                              <Button
                                onClick={() => cashIn(amount)}
                                color="brand"
                                icon={<Money />}
                                label="Contribute Reserve"
                                size="small"
                              />
                              <Button
                                onClick={() => cashOut(amount)}
                                color="complementary"
                                icon={<Atm />}
                                label="Redeem CIC"
                                size="small"
                              />
                            </Box>
                          </Box>
                          <Box
                            direction={large ? 'row' : 'column'}
                            gap="medium"
                          >
                            <NumberDisplay
                              value={cicPrice}
                              label="Reserve -> CIC"
                              color="brand"
                              align="end"
                            />
                            <NumberDisplay
                              value={reservePrice}
                              label="CIC -> Reserve"
                              color="complementary"
                              align="end"
                            />
                          </Box>
                        </Box>

                        <ResponsiveContainer width="100%" height={400}>
                          <ComposedChart
                            width="100%"
                            height={400}
                            data={priceSetWithCicPrices}
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
                              <Label
                                value="price"
                                offset={0}
                                position="insideTopLeft"
                              />
                            </YAxis>
                            <Tooltip />
                            <Legend />
                            {/* <Bar
                    name="Reserve Price"
                    stackId="a"
                    fill="#bbde8a"
                    dataKey="price"
                    barSize={15}
                  />
                  <Bar
                    name="Price Difference"
                    stackId="a"
                    fill="#db4834"
                    dataKey="priceDifference"
                    barSize={15}
                  /> */}
                            <Line
                              name="Reserve -> CIC"
                              type="natural"
                              dataKey="cicPrice"
                              stroke={theme.global.colors.brand}
                              strokeWidth={2}
                            />
                            <Line
                              name="CIC -> Reserve"
                              type="natural"
                              dataKey="price"
                              stroke={theme.global.colors.complementary}
                              strokeWidth={2}
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </Box>
                    </Col>
                  )}
                </Row>
              </Container>
            </Box>
          );
        }}
      />
    </Grommet>
  );
}

export default App;
