import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import {motion} from "framer-motion";
import Link from "next-translate/Link";
import * as React from "react";

import Member from "@sentrei/types/models/Member";
import BadgeAway from "@sentrei/ui/components/BadgeAway";
import BadgeOffline from "@sentrei/ui/components/BadgeOffline";
import BadgeOnline from "@sentrei/ui/components/BadgeOnline";

export interface Props {
  member: Member.Get;
}

function ProfileCard({member}: Props): JSX.Element {
  return (
    <motion.span whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
      <Box p={0.5} key={member.username}>
        <Link href="/profile/[profileId]" as={`/profile/${member.username}`}>
          {member.status === "online" ? (
            <BadgeOnline
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
            >
              <Avatar src={member.photo || undefined} />
            </BadgeOnline>
          ) : member.status === "offline" ? (
            <BadgeOffline
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
            >
              <Avatar src={member.photo || undefined} />
            </BadgeOffline>
          ) : (
            <BadgeAway
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
            >
              <Avatar src={member.photo || undefined} />
            </BadgeAway>
          )}
        </Link>
      </Box>
    </motion.span>
  );
}

export default ProfileCard;
