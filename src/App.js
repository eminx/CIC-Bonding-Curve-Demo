import React, { useState } from 'react';
import {
  Anchor,
  Paragraph,
  Button,
  Box,
  Image,
  Grommet,
  Main,
  Text,
  Footer,
} from 'grommet';
import { NumberInput } from 'grommet-controls';
import {
  ResponsiveContainer,
  ComposedChart,
  //Bar,
  Legend,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Area,
  //AreaChart,
} from 'recharts';
import {
  Atm,
  Money,
  Cafeteria,
  Tools,
  Bike,
  Basket,
  Book,
  Grow,
} from 'grommet-icons';
import { Container, Row, Col, ScreenClassRender } from 'react-grid-system';

import theme from './config/theme';
import {
  AppBar,
  InitialsUI,
  PlayMonitor,
  NumberDisplayInline,
} from './components';
import {
  getNewSupplyCashIn,
  getNewReserveCashOut,
  getPrice,
  getInvPrice,
  getCRR,
  defaultInitials,
  defaultCICAmount,
  defaultResAmount,
  defaultPriceSetItem,
} from './config';

function App() {
  const [initials, setInitials] = useState(defaultInitials);
  const [playMode, setPlayMode] = useState(false);
  const [cicAmount, setCICAmount] = useState(defaultCICAmount);
  const [resAmount, setResAmount] = useState(defaultResAmount);
  const [priceSet, setPriceSet] = useState([defaultPriceSetItem]);

  const setInitial = (initial) => {
    setInitials({ ...initials, ...initial });
  };

  const buyCIC = (cicAmount) => {
    const { cicBal, cicPurchases } = initials;
    if (cicAmount <= cicBal) {
      const newcicPurchases = cicPurchases + cicAmount;
      const newcicBal = cicBal - cicAmount;
      setInitials({
        reserve: initials.reserve,
        supply: initials.supply,
        trr: initials.trr,
        crr: initials.crr,
        cicBal: newcicBal,
        resBal: initials.resBal,
        cicPurchases: newcicPurchases,
        cicSales: initials.cicSales,
        resPurchases: initials.resPurchases,
        resSales: initials.resSales,
      });
    }
  };

  const sellCIC = (cicAmount) => {
    const { supply, cicBal, cicSales } = initials;
    if (cicBal + cicAmount <= supply) {
      //You can't have more than the total supply

      const newcicSales = cicSales + cicAmount;
      const newcicBal = cicBal + cicAmount;
      setInitials({
        reserve: initials.reserve,
        supply: initials.supply,
        trr: initials.trr,
        crr: initials.crr,
        cicBal: newcicBal,
        resBal: initials.resBal,
        cicPurchases: initials.cicPurchases,
        cicSales: newcicSales,
        resPurchases: initials.resPurchases,
        resSales: initials.resSales,
      });
    }
  };

  const buyReserve = (resAmount) => {
    const { resBal, resPurchases } = initials;
    if (resAmount <= resBal) {
      const newresPurchases = resPurchases + resAmount;
      const newresBal = resBal - resAmount;
      setInitials({
        reserve: initials.reserve,
        supply: initials.supply,
        trr: initials.trr,
        crr: initials.crr,
        cicBal: initials.cicBal,
        resBal: newresBal,
        cicPurchases: initials.cicPurchases,
        cicSales: initials.cicSales,
        resPurchases: newresPurchases,
        resSales: initials.resSales,
      });
    }
  };

  const sellReserve = (resAmount) => {
    const { resBal, resSales } = initials;
    const newresSales = resSales + resAmount;
    const newresBal = resBal + resAmount;
    setInitials({
      reserve: initials.reserve,
      supply: initials.supply,
      trr: initials.trr,
      crr: initials.crr,
      cicBal: initials.cicBal,
      resBal: newresBal,
      cicPurchases: initials.cicPurchases,
      cicSales: initials.cicSales,
      resPurchases: initials.resPurchases,
      resSales: newresSales,
    });
  };

  const getCashIn = (resAmount) => {
    const { reserve, supply, trr } = initials;
    const addedSupply = getNewSupplyCashIn(reserve, supply, trr, resAmount);
    return addedSupply;
  };

  const cashIn = (resAmount) => {
    const { reserve, supply, trr, cicBal, resBal } = initials;
    if (resAmount <= resBal) {
      const newReserve = reserve + resAmount;
      const addedSupply = getNewSupplyCashIn(reserve, supply, trr, resAmount);
      const newSupply = supply + addedSupply;
      const newCRR = newReserve / newSupply;
      const newcicBal = cicBal + addedSupply;
      const newresBal = Math.round(resBal - resAmount);
      setInitials({
        reserve: newReserve,
        supply: newSupply,
        trr: initials.trr,
        crr: newCRR,
        cicBal: newcicBal,
        resBal: newresBal,
        cicPurchases: initials.cicPurchases,
        cicSales: initials.cicSales,
        resPurchases: initials.resPurchases,
        resSales: initials.resSales,
      });
      setPriceSet([
        ...priceSet,
        {
          trr: trr,
          crr: getCRR(newReserve, newSupply),
          price: getPrice(newReserve, newSupply, trr),
          step: priceSet.length,
        },
      ]);
    }
  };

  const getCashOut = (cicAmount) => {
    const { reserve, supply, trr } = initials;
    const addedReserve = getNewReserveCashOut(reserve, supply, trr, cicAmount);
    return -1 * addedReserve;
  };

  const cashOut = (cicAmount) => {
    const { reserve, supply, trr, cicBal, resBal } = initials;
    if (cicAmount <= cicBal) {
      const addedReserve = getNewReserveCashOut(
        reserve,
        supply,
        trr,
        cicAmount
      );
      const newReserve = reserve + addedReserve;
      const newSupply = supply - cicAmount;
      const newCRR = newReserve / newSupply;
      const newcicBal = Math.round(cicBal - cicAmount);
      const newresBal = resBal - addedReserve;

      setInitials({
        reserve: newReserve,
        supply: newSupply,
        trr: initials.trr,
        crr: newCRR,
        cicBal: newcicBal,
        resBal: newresBal,
        cicPurchases: initials.cicPurchases,
        cicSales: initials.cicSales,
        resPurchases: initials.resPurchases,
        resSales: initials.resSales,
      });
      setPriceSet([
        ...priceSet,
        {
          trr: trr,
          crr: getCRR(newReserve, newSupply),
          price: getPrice(newReserve, newSupply, initials.trr),
          step: priceSet.length,
        },
      ]);
    }
  };

  const changePlayMode = () => {
    const { reserve, supply, trr } = initials;
    if (playMode) {
      setPlayMode(false);
      setInitials(defaultInitials);
      setPriceSet([defaultPriceSetItem]);
      setCICAmount(defaultCICAmount);
      setResAmount(defaultResAmount);
    } else {
      setPriceSet([
        {
          trr: trr,
          crr: getCRR(reserve, supply),
          price: getPrice(reserve, supply, trr),
          step: 0,
        },
      ]);
      setPlayMode(true);
    }
  };

  // const reservePrice = priceSet[priceSet.length - 1].price;
  //const cicPrice = (1 / reservePrice).toFixed(2);

  const priceSetWithCicPrices = priceSet.map((item) => ({
    ...item,
    cicPrice: (1 / item.price).toFixed(2),
    priceDifference: (1 / item.price - item.price).toFixed(2),
  }));

  return (
    <Grommet theme={theme}>
      <ScreenClassRender
        render={(screenClass) => {
          const large = ['xxl', 'xl', 'lg'].includes(screenClass);
          return (
            <Box background="light-1" height="100%" width="100%">
              <Container fluid style={{ width: '100%', padding: 0 }}>
                <AppBar direction="row">
                  <Row
                    justify="center"
                    style={{ width: '100%' }}
                    align="center"
                  >
                    <Col lg={3}>
                      <Image
                        width="180px"
                        src="https://mikroklima-landingpages.s3.eu-central-1.amazonaws.com/cocoso-landingpage/grassrootseconomics-logo.png"
                      />
                    </Col>
                    <Col lg={6}>
                      <Box pad="small">
                        <Text size="large" weight="bold" textAlign="center">
                          Community Inclusion Currency (CIC)
                        </Text>
                        <Text size="small">Demo & Play</Text>
                      </Box>
                    </Col>
                    <Col lg={3}>
                      <Box width="180px" height="10px" />
                    </Col>
                  </Row>
                </AppBar>
                <Main style={{ minHeight: '100vh' }}>
                  <Row style={{ marginLeft: 0, marginRight: 0 }}>
                    <Col lg={playMode ? 3 : 12}>
                      <Box
                        width={playMode ? 'small' : 'large'}
                        style={{ margin: '0 auto' }}
                        animation={playMode ? 'slideLeft' : 'fadeIn'}
                        pad={{ bottom: 'xlarge' }}
                      >
                        {playMode ? (
                          <PlayMonitor initials={initials} />
                        ) : (
                          <InitialsUI
                            initials={initials}
                            setInitial={setInitial}
                          />
                        )}

                        <Box gap="medium" justify="between">
                          {/*playMode && (
                            <Button label="Reset" onClick={() => resetAll()} />
                          )*/}
                          <Button
                            primary={!playMode}
                            label={playMode ? 'Restart' : 'Start'}
                            onClick={() => changePlayMode()}
                          />
                        </Box>
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
                            gap="small"
                            justify="between"
                            align="center"
                          >
                            <Box
                              direction={large ? 'row' : 'column'}
                              align="center"
                              gap="small"
                            >
                              <Box width="small" align="start" pad="xsmall">
                                <Box
                                  direction={'row'}
                                  align="center"
                                  gap="xsmall"
                                >
                                  <Button
                                    onClick={() => buyCIC(50)}
                                    color="brand"
                                    icon={<Basket />}
                                    label="Buy 50"
                                    size="xsmall"
                                  />
                                  <Button
                                    onClick={() => buyCIC(250)}
                                    color="brand"
                                    icon={<Tools />}
                                    label="Buy 250"
                                    size="xsmall"
                                  />
                                </Box>

                                <Box
                                  direction={'row'}
                                  align="center"
                                  gap="xsmall"
                                >
                                  <Button
                                    onClick={() => sellCIC(300)}
                                    color="brand"
                                    icon={<Cafeteria />}
                                    label="Sell 300"
                                    size="xsmall"
                                  />
                                  <Button
                                    onClick={() => sellCIC(500)}
                                    color="brand"
                                    icon={<Grow />}
                                    label="Sell 500"
                                    size="xsmall"
                                  />
                                </Box>
                                <NumberDisplayInline
                                  value={initials.cicBal}
                                  label="My CIC: "
                                  color="brand"
                                  align="end"
                                  alignLabelRight
                                  size="small"
                                />

                                <NumberDisplayInline
                                  value={initials.cicPurchases}
                                  label="Bought: "
                                  color="brand"
                                  align="end"
                                  alignLabelRight
                                  size="large"
                                />
                                <NumberDisplayInline
                                  value={initials.cicSales}
                                  label="Sold: "
                                  color="brand"
                                  align="end"
                                  alignLabelRight
                                  size="large"
                                />

                                <NumberInput
                                  size="medium"
                                  value={cicAmount.toString()}
                                  decimals={0}
                                  step={100}
                                  min={0}
                                  max={initials.cicBal}
                                  onChange={({ target: { value } }) =>
                                    setCICAmount(Number(value))
                                  }
                                />
                                <Button
                                  onClick={() => cashOut(cicAmount)}
                                  color="brand"
                                  icon={<Atm />}
                                  label="Redeem CIC"
                                  size="small"
                                />
                                <NumberDisplayInline
                                  value={getPrice(
                                    initials.reserve,
                                    initials.supply,
                                    initials.trr
                                  )}
                                  label="Rate: "
                                  color="brand"
                                  align="start"
                                />
                                <NumberDisplayInline
                                  value={getCashOut(cicAmount)}
                                  label="+Reserve: "
                                  color="brand"
                                  alignLabelRight
                                  size="small"
                                />
                              </Box>
                            </Box>

                            <Box
                              direction={large ? 'row' : 'column'}
                              align="center"
                              gap="small"
                            >
                              <Box width="small" align="start" pad="xsmall">
                                <Box
                                  direction={'row'}
                                  align="center"
                                  gap="xsmall"
                                >
                                  <Button
                                    onClick={() => buyReserve(100)}
                                    color="complementary"
                                    icon={<Bike />}
                                    label="Buy 100"
                                    size="xsmall"
                                  />
                                  <Button
                                    onClick={() => buyReserve(100)}
                                    color="complementary"
                                    icon={<Book />}
                                    label="Buy 100"
                                    size="xsmall"
                                  />
                                </Box>
                                <Box
                                  direction={'row'}
                                  align="center"
                                  gap="xsmall"
                                >
                                  <Button
                                    onClick={() => sellReserve(300)}
                                    color="complementary"
                                    icon={<Cafeteria />}
                                    label="Sell 300"
                                    size="xsmall"
                                  />
                                  <Button
                                    onClick={() => sellReserve(500)}
                                    color="complementary"
                                    icon={<Grow />}
                                    label="Sell 500"
                                    size="xsmall"
                                  />
                                </Box>

                                <NumberDisplayInline
                                  value={initials.resBal}
                                  label="My Reserve: "
                                  color="complementary"
                                  align="end"
                                  alignLabelRight
                                  size="small"
                                />

                                <NumberDisplayInline
                                  value={initials.resPurchases}
                                  label="Bought: "
                                  color="complementary"
                                  align="end"
                                  alignLabelRight
                                  size="small"
                                />
                                <NumberDisplayInline
                                  value={initials.resSales}
                                  label="Sold: "
                                  color="complementary"
                                  align="end"
                                  alignLabelRight
                                  size="small"
                                />

                                <NumberInput
                                  size="medium"
                                  value={resAmount.toString()}
                                  decimals={0}
                                  step={100}
                                  min={0}
                                  max={initials.resBal}
                                  onChange={({ target: { value } }) =>
                                    setResAmount(Number(value))
                                  }
                                />

                                <Button
                                  onClick={() => cashIn(resAmount)}
                                  color="complementary"
                                  icon={<Money />}
                                  label="Contribute Reserve"
                                  size="xsmall"
                                />
                                <NumberDisplayInline
                                  value={getInvPrice(
                                    initials.reserve,
                                    initials.supply,
                                    initials.trr
                                  )}
                                  label="Rate: "
                                  color="complementary"
                                  align="start"
                                />
                                <NumberDisplayInline
                                  value={getCashIn(resAmount)}
                                  label="+CIC : "
                                  color="complementary"
                                  alignLabelRight
                                  size="small"
                                />
                              </Box>
                            </Box>

                            <ResponsiveContainer width="50%" height={400}>
                              <ComposedChart
                                width="100%"
                                height={400}
                                data={priceSetWithCicPrices}
                                margin={{
                                  top: 20,
                                  right: 30,
                                  left: 0,
                                  bottom: 0,
                                }}
                              >
                                <CartesianGrid strokeDasharray="1 3" />
                                <YAxis>
                                  <Label
                                    value=""
                                    offset={0}
                                    position="insideTopLeft"
                                  />
                                </YAxis>

                                <XAxis dataKey="step">
                                  <Label
                                    value="conversions"
                                    offset={0}
                                    position="insideBottomRight"
                                  />
                                </XAxis>
                                <Tooltip />
                                <Legend />
                                {/*<Bar
                                name="Reserve Ratio"
                                stackId="a"                     
  			        fill={theme.global.colors.complementary}
                                dataKey="crr"
                                barSize={15}
                              />*/}
                                <Line
                                  name="Excahnge Rate"
                                  type="natural"
                                  dataKey="price"
                                  stroke={theme.global.colors.brand}
                                  strokeWidth={2}
                                />
                                <Area
                                  name="Reserve Ratio"
                                  type="natural"
                                  dataKey="crr"
                                  stroke={theme.global.colors.complementary}
                                  strokeWidth={2}
                                />
                                <Line
                                  name="Target Reserve Ratio"
                                  type="natural"
                                  dataKey="trr"
                                  stroke={theme.global.colors.black}
                                  strokeWidth={4}
                                  strokeDasharray="3 3"
                                />
                              </ComposedChart>
                            </ResponsiveContainer>
                          </Box>
                        </Box>
                      </Col>
                    )}
                  </Row>
                </Main>

                <Footer
                  background="light-2"
                  direction="row"
                  width="100%"
                  justify="center"
                >
                  <Box width="medium" pad="medium">
                    <Paragraph size="small" textAlign="center">
                      <Anchor
                        target="_blank"
                        href="https://gitlab.com/grassrootseconomics/cic-bonding-curve-demo"
                      >
                        <code>Source Code</code>
                      </Anchor>
                    </Paragraph>
                  </Box>
                </Footer>
              </Container>
            </Box>
          );
        }}
      />
    </Grommet>
  );
}

export default App;
