import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PieChart as RePieChart, Pie, Cell, Tooltip } from "recharts";
import { types } from "../assets/ticket-types";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function PieChart({ tickets }) {
  const [data, setData] = useState([]);
  const [colors, setColors] = useState([]);
  useEffect(() => {
    const ticketByType = tickets.reduce((group, ticket) => {
      const { type } = ticket;
      group[type] = group[type] ?? [];
      group[type].push(ticket);
      return group;
    }, {});

    let entries = Object.entries(ticketByType);
    let result = [];
    let resultColors = [];
    entries.map(([key, val]) =>
      result.push({
        name: key,
        value: val.length,
      })
    );
    result.map((res) => {
      const colorType = types.find((x) => x.name === res.name);
      if (colorType) {
        resultColors.push(colorType.color);
      }
      return resultColors;
    });
    setData(result);
    setColors(resultColors);
  }, [tickets]);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      {data.length ? (
        <>
          <RePieChart width={200} height={200}>
            <Pie
              data={data}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </RePieChart>
          <Stack gap={2}>
            <Typography variant="h6">Tickets</Typography>
            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              {colors.map((color, i) => (
                <Stack key={color} alignItems="center" spacing={1}>
                  <Box sx={{ width: 20, height: 20, background: color }} />
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    {data[i]?.name}
                  </Typography>
                </Stack>
              ))}
            </Box>
          </Stack>
        </>
      ) : (
        <Typography variant="h6">No Tickets</Typography>
      )}
    </Box>
  );
}
