import React, { useState } from 'react';
import {
  Anchor,
  Paragraph,
  Button,
  Box,
  Image,
  Grommet,
  Menu,
  Text,
  Footer,
} from 'grommet';
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
// import { Atm, Money } from 'grommet-icons';
import { Container, Row, Col, ScreenClassRender } from 'react-grid-system';

import theme from './config/theme';
import { AppBar, InitialsUI, PlayMonitor, NumberDisplay } from './components';
import {
  getNewSupplyCashIn,
  getNewReserveCashOut,
  getPrice,
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
  };

  const sellCIC = (cicAmount) => {
    const { cicBal, cicSales } = initials;
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
  };

  const buyReserve = (resAmount) => {
    const { resBal, resPurchases } = initials;
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

  const cashIn = (resAmount) => {
    const { reserve, supply, trr, cicBal, resBal } = initials;
    const newReserve = reserve + resAmount;
    const addedSupply = getNewSupplyCashIn(reserve, supply, trr, resAmount);
    const newSupply = supply + addedSupply;
    const newCRR = newReserve / newSupply;
    const newcicBal = cicBal + addedSupply;
    const newresBal = resBal - resAmount;
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
        price: getPrice(newReserve, newSupply, trr),
        step: priceSet.length,
      },
    ]);
  };

  const cashOut = (cicAmount) => {
    const { reserve, supply, trr, cicBal, resBal } = initials;
    const addedReserve = getNewReserveCashOut(reserve, supply, trr, cicAmount);
    const newReserve = reserve + addedReserve;
    const newSupply = supply - cicAmount;
    const newCRR = newReserve / newSupply;
    const newcicBal = cicBal - cicAmount;
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
      setCICAmount(defaultCICAmount);
      setResAmount(defaultResAmount);
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

  const resetAll = () => {
    const { reserve, supply, trr } = initials;
    if (playMode) {
      setInitials(defaultInitials);
      setPriceSet([defaultPriceSetItem]);
      setCICAmount(defaultCICAmount);
      setResAmount(defaultResAmount);
    } else {
      setPriceSet([
        {
          price: getPrice(reserve, supply, trr),
          step: 0,
        },
      ]);
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
                          CIC Demo & Play
                        </Text>
                        <Text size="small">
                          CIC = Community Inclusion Currency
                        </Text>
                      </Box>
                    </Col>
                    <Col lg={3}>
                      <Box width="180px" height="10px" />
                    </Col>
                  </Row>
                </AppBar>
                <Box pad="small">
                  <Row justify="center">
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
                          {playMode && (
                            <Button label="Reset" onClick={() => resetAll()} />
                          )}
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
                                <NumberInput
                                  size="medium"
                                  value={cicAmount.toString()}
                                  decimals={0}
                                  step={100}
                                  min={1}
                                  max={initials.cicBal}
                                  onChange={({ target: { value } }) =>
                                    setCICAmount(Number(value))
                                  }
                                />
                                <Menu
                                  label={
                                    <Text size="xsmall" weight="bold">
                                      CIC ACTIONS
                                    </Text>
                                  }
                                  alignSelf="end"
                                  items={[
                                    {
                                      label: 'Buy with CIC',
                                      onClick: () => buyCIC(cicAmount),
                                    },
                                    {
                                      label: 'Sell for CIC',
                                      onClick: () => sellCIC(cicAmount),
                                    },
                                    {
                                      label: 'Redeem CIC',
                                      onClick: () => cashOut(cicAmount),
                                    },
                                  ]}
                                  background="light-1"
                                  dropAlign={{ top: 'bottom', right: 'right' }}
                                />
                              </Box>

                              <Box width="small" align="start" pad="xsmall">
                                <NumberInput
                                  size="medium"
                                  value={resAmount.toString()}
                                  decimals={0}
                                  step={100}
                                  min={1}
                                  max={initials.resBal}
                                  onChange={({ target: { value } }) =>
                                    setResAmount(Number(value))
                                  }
                                />
                                <Menu
                                  label={
                                    <Text size="xsmall" weight="bold">
                                      RESERVE ACTIONS
                                    </Text>
                                  }
                                  alignSelf="end"
                                  items={[
                                    {
                                      label: 'Buy with Reserve',
                                      onClick: () => buyReserve(resAmount),
                                    },
                                    {
                                      label: 'Sell for Reserve',
                                      onClick: () => sellReserve(resAmount),
                                    },
                                    {
                                      label: 'Contribute Reserve',
                                      onClick: () => cashIn(resAmount),
                                    },
                                  ]}
                                  background="light-1"
                                  dropAlign={{ top: 'bottom', right: 'right' }}
                                />
                              </Box>
                            </Box>

                            <Box
                              direction={large ? 'row' : 'column'}
                              gap="medium"
                            >
                              <Box size="small">
                                <NumberDisplay
                                  value={initials.cicPurchases}
                                  label="CIC Purchases"
                                  color="brand"
                                  align="end"
                                  alignLabelRight
                                  size="large"
                                />
                                <NumberDisplay
                                  value={initials.cicSales}
                                  label="CIC Sales"
                                  color="brand"
                                  align="end"
                                  alignLabelRight
                                  size="large"
                                />
                              </Box>
                              <Box size="small">
                                <NumberDisplay
                                  value={initials.resPurchases}
                                  label="Reserve Purchases"
                                  color="complementary"
                                  align="end"
                                  alignLabelRight
                                  size="large"
                                />
                                <NumberDisplay
                                  value={initials.resSales}
                                  label="Reserve Sales"
                                  color="complementary"
                                  align="end"
                                  alignLabelRight
                                  size="large"
                                />
                              </Box>
                              <Box size="small">
                                <NumberDisplay
                                  value={initials.cicBal}
                                  label="My CIC Balance"
                                  color="dark-1"
                                  align="end"
                                  alignLabelRight
                                  size="large"
                                />
                                <NumberDisplay
                                  value={initials.resBal}
                                  label="My Reserve Balance"
                                  color="dark-1"
                                  align="end"
                                  alignLabelRight
                                  size="large"
                                />
                              </Box>
                            </Box>
                          </Box>

                          <ResponsiveContainer width="100%" height={400}>
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
                </Box>

                <Footer
                  background="light-2"
                  direction="row"
                  width="100%"
                  justify="center"
                >
                  <Box width="medium" pad="medium">
                    <Paragraph size="small" textAlign="center">
                      Built with{' '}
                      <Anchor href="http://recharts.org/">Recharts</Anchor>
                      {', '}
                      <Anchor href="https://v2.grommet.io/">Grommet</Anchor>
                      {', '}
                      <Anchor href="https://reactjs.org">React </Anchor> <br />
                      and a bunch of other source code by{' '}
                      <Anchor href="https://infinitesimals.space">
                        Emin Durak
                      </Anchor>{' '}
                      and Will Ruddick for{' '}
                      <Anchor href="https://www.grassrootseconomics.org">
                        Grassroots Economics.
                      </Anchor>
                      <br />
                    </Paragraph>
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
