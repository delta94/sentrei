import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import * as React from "react";

import Props from "@sentrei/types/components/TabBoard";
import TabPanel from "@sentrei/ui/components/TabPanel";

function a11yProps(
  index: number,
): {
  id: string;
  "aria-controls": string;
} {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const TabBoard = ({
  tabIconOne,
  tabIconTwo,
  tabIconThree,
  tabLabelOne,
  tabLabelTwo,
  tabLabelThree,
  tabPanelOne,
  tabPanelTwo,
  tabPanelThree,
}: Props): JSX.Element => {
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: number,
  ): void => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container justify="center" direction="row" spacing={1}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label={tabLabelOne} icon={tabIconOne} {...a11yProps(0)} />
          <Tab label={tabLabelTwo} icon={tabIconTwo} {...a11yProps(1)} />
          <Tab label={tabLabelThree} icon={tabIconThree} {...a11yProps(2)} />
        </Tabs>
      </Grid>
      <TabPanel value={value} index={0}>
        {tabPanelOne}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {tabPanelTwo}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {tabPanelThree}
      </TabPanel>
    </>
  );
};

export default TabBoard;
