import React, {useState} from 'react'
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

const recordsData = {
  active: [
    {id: 1, name: 'Record 1', category: 'Category A'},
    {id: 2, name: 'Record 2', category: 'Category B'},
  ],
  history: [
    {id: 3, name: 'Record 3', category: 'Category A'},
    {id: 4, name: 'Record 4', category: 'Category B'},
  ],
}

const detailsData = {
  1: [{field: 'Detail A1', value: 'Value A1'}],
  2: [{field: 'Detail B1', value: 'Value B1'}],
  3: [{field: 'Detail A2', value: 'Value A2'}],
  4: [{field: 'Detail B2', value: 'Value B2'}],
}

const extraData = {
  1: [{metric: 'Metric A1', score: 'Score A1'}],
  2: [{metric: 'Metric B1', score: 'Score B1'}],
  3: [{metric: 'Metric A2', score: 'Score A2'}],
  4: [{metric: 'Metric B2', score: 'Score B2'}],
}

const allCategories = ['Category A', 'Category B']

export default function TabbedTableView() {
  const [topTab, setTopTab] = useState('active')
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [activeCategoryTab, setActiveCategoryTab] = useState('')

  const handleRecordClick = (record) => {
    setSelectedRecord(record)
    setActiveCategoryTab(record.category)
  }

  const records = recordsData[topTab]
  const detailRows = selectedRecord ? detailsData[selectedRecord.id] || [] : []
  const extraRows = selectedRecord ? extraData[selectedRecord.id] || [] : []

  return (
    <Box sx={{p: 4}}>
      {/* Top Tabs */}
      <Tabs
        value={topTab}
        onChange={(e, val) => {
          setTopTab(val)
          setSelectedRecord(null)
          setActiveCategoryTab('')
        }}
        textColor="primary"
        indicatorColor="primary"
        sx={{mb: 2}}
      >
        <Tab label="Active" value="active" />
        <Tab label="History" value="history" />
      </Tabs>

      {/* Top Table */}
      <TableContainer component={Paper} sx={{mb: 4}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((rec) => (
              <TableRow
                key={rec.id}
                hover
                sx={{cursor: 'pointer'}}
                onClick={() => handleRecordClick(rec)}
              >
                <TableCell>{rec.id}</TableCell>
                <TableCell>{rec.name}</TableCell>
                <TableCell>{rec.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Bottom Category Tabs */}
      <Tabs
        value={activeCategoryTab}
        onChange={(e, val) => setActiveCategoryTab(val)}
        textColor="secondary"
        indicatorColor="secondary"
        sx={{mb: 2}}
      >
        {allCategories.map((category) => (
          <Tab key={category} label={category} value={category} />
        ))}
      </Tabs>

      {/* Render details only if selected record matches the active tab */}
      {selectedRecord && selectedRecord.category === activeCategoryTab && (
        <>
          <Typography variant="h6" sx={{mt: 2}}>
            Details for {selectedRecord.name}
          </Typography>
          <TableContainer component={Paper} sx={{mb: 3, mt: 1}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Field</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detailRows.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{row.field}</TableCell>
                    <TableCell>{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6">Additional Info</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Metric</TableCell>
                  <TableCell>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {extraRows.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{row.metric}</TableCell>
                    <TableCell>{row.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  )
}

