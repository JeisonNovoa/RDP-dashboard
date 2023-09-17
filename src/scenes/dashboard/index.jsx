import React, { useState } from 'react'; // Importa useState para gestionar el estado
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import { tokens } from '../../theme';
import { mockTransactions } from '../../data/mockData';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrafficIcon from '@mui/icons-material/Traffic';
import Header from '../../components/Header';
import LineChart from '../../components/CoinValue';
import GeographyChart from '../../components/VolumeCoin';
import BarChart from '../../components/CategoryChart';
import StatBox from '../../components/StatBox';
import ProgressCircle from '../../components/ProgressCircle';
import ChartComponent from '../../components/InteractiveChartValue';
import BarComponent from '../../components/InteractiveVolume';
import InterfaceComponent from '../../components/UpdateData';

const Dashboard = () => {
  // Inicializa el estado con useState
  const [gameSelected, setGameSelected] = useState('1');
  const [chainSelected, setChainSelected] = useState('1');
  const [timeSelected, setTimeSelected] = useState('32');
  
  const handleGameSelect = (e) => {
    const selectedValue = e.target.value;
    setGameSelected(selectedValue);
    setShowChart(false);
    console.log(selectedValue);
  };

  const handleChainSelect = (e) => {
    const selectedValue = e.target.value;
    setChainSelected(selectedValue);
    setShowChart(false);
    console.log(selectedValue);
  };

  const handleRangeSelect = (e) => {
    const selectedValue = e.target.value;
    setTimeSelected(selectedValue);
    setShowChart(false);
    console.log(selectedValue);
  };
  const [showChart, setShowChart] = useState(false);

  // Handle button click to show ChartComponent
  const handleTrackCoinClick = () => {
    setShowChart(true);
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />       
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          //alignItems="center"
          //justifyContent="center"
        >
          <Typography
                variant="h3"
                fontWeight="600"
                color={colors.grey[100]}           
          >
                Select Game
          </Typography>
          <select 
            className="form-control outline-primary" 
            aria-labelledby="game" 
            value={gameSelected}
            onChange={handleGameSelect}
            >
            <option class="dropdown-item" id="game_selected" value="1">EV.io</option>
            <option class="dropdown-item" id="game_selected" value="5">League of Kingdoms</option>
            <option class="dropdown-item" id="game_selected" value="7">Big Time</option>
            <option class="dropdown-item" id="game_selected" value="9">Champions Ascension</option>
            <option class="dropdown-item" id="game_selected" value="2">Axie Infinity </option>
            <option class="dropdown-item" id="game_selected" value="3">The Sandbox</option>
            <option class="dropdown-item" id="game_selected" value="4">Illuvium</option>
            <option class="dropdown-item" id="game_selected" value="6">Castle Crush</option>
            <option class="dropdown-item" id="game_selected" value="8">Castaways</option>
            <option class="dropdown-item" id="game_selected" value="10">Crypto Unicorns</option>
            <option class="dropdown-item" id="game_selected" value="11">Pixels.xyz</option>
            <option class="dropdown-item" id="game_selected" value="12">My Pet Hooligan</option>
          </select>          
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
        >
          <Typography
                variant="h3"
                fontWeight="600"
                color={colors.grey[100]}
          >
                Select Chain
          </Typography>
          <select 
            className="form-control outline-primary" 
            aria-labelledby="chain" 
            value={chainSelected} 
            onChange={handleChainSelect}
          >
            <option class="dropdown-item" id="chain_selected" value="1">USD</option>
            <option class="dropdown-item" id="chain_selected" value="2">Etherium</option>
            <option class="dropdown-item" id="chain_selected" value="3">Sepolia</option>
          </select>  
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
        >
          <Typography
                variant="h3"
                fontWeight="600"
                color={colors.grey[100]}
          >
                Select Timelapse
          </Typography>
          <select 
            className="form-control outline-primary" 
            aria-labelledby="chain" 
            value={timeSelected} 
            onChange={handleRangeSelect}
            >
            <option class="dropdown-item" id="time_slected" value="8">7 Days</option>
            <option class="dropdown-item" id="time_selected" value="16">15 Days</option>
            <option class="dropdown-item" id="time_selected" value="32">30 Days</option>
          </select>
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            type="submit" color="secondary" variant="contained" onClick={handleTrackCoinClick}
          >
            Track Coin           
          </Button>
        </Box>
        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h1"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Coin Tracker
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            {/* <LineChart isDashboard={true} /> */}
            { showChart && <ChartComponent chain={chainSelected} coin={gameSelected} range={timeSelected} />}
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.GameID}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.GameName}
                </Typography>
              </Box>

               {/* Componente asisgnado */}
                <InterfaceComponent GameID={transaction.GameID} CoinID={transaction.CoinID} ChartURL={transaction.url} EndpointChart={transaction.ChartURL} type={transaction.type} />
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.Category}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h2" fontWeight="600">
            Funds Deployed
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h3"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              84% 
            </Typography>
            <Typography>Funds Deployed on This Coin</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h2"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Games Categories
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h2"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Coin Volume
          </Typography>
          <Box height="200px">
            {/* <GeographyChart isDashboard={true} /> */}
            { showChart && <BarComponent chain={chainSelected} coin={gameSelected} range={timeSelected} />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
