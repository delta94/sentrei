import Box from "@material-ui/core/Box";
import {motion} from "framer-motion";
import * as React from "react";

import Member from "@sentrei/types/models/Member";
import BadgeStatus from "@sentrei/ui/components/BadgeStatus";

export interface Props {
  member: Member.Get;
}

function ProfileCard({member}: Props): JSX.Element {
  return (
    <motion.span whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
      <Box p={0.5} key={member.username}>
        <BadgeStatus member={member} />
      </Box>
    </motion.span>
  );
}

export default ProfileCard;
