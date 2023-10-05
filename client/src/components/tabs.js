import { Tabs as MuiTabs, Tab as MuiTab, Box } from "@mui/material";
import Project from "pages/project";
import Tickets from "pages/ticket";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Tabs = ({ tab, title }) => {
  const navigate = useNavigate();
  const { projectId, ticketId } = useParams();
  const tabNameToIndex = {
    0: `project${projectId ? `/${projectId}` : ""}`,
    1: `project/${projectId}/tickets`,
  };

  const indexToTabName = {
    project: 0,
    tickets: 1,
  };

  const [selectedTab, setSelectedTab] = useState(indexToTabName[tab]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const handleChange = (event, newValue) => {
    navigate(`/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };

  return (
    <Box margin={5}>
      <MuiTabs
        value={selectedTab}
        onChange={handleChange}
        sx={{
          "& .MuiTabs-flexContainer": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          "& .MuiTabs-indicator": { backgroundColor: "#9c27b0" },
          "& .MuiTab-root.Mui-selected": {
            color: "#9c27b0",
            fontWeight: "700",
          },
          "& button:hover": {
            backgroundColor: "#f8dbfd",
            transition: " background-color 0.5s ease",
          },
        }}
      >
        <MuiTab label="Project" sx={{ fontSize: "1.5em" }} />
        {projectId && <MuiTab label="Tickets" sx={{ fontSize: "1.5em" }} />}
      </MuiTabs>
      {selectedTab === 0 && (
        <Project projectId={projectId} mode={projectId ? "Edit" : "Add"} />
      )}
      {selectedTab === 1 && (
        <Tickets projectId={projectId} ticketId={ticketId} />
      )}
    </Box>
  );
};

export default Tabs;
