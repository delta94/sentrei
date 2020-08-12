import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareIcon from "@material-ui/icons/Share";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Skeleton from "@material-ui/lab/Skeleton";
import Link from "next-translate/Link";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import {getMembersLive} from "@sentrei/common/firebase/members";
import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import ProfileCard from "@sentrei/ui/components/ProfileCard";
import RoomCardEmojiPicker from "@sentrei/ui/components/RoomCardEmojiPicker";
import RoomMenu from "@sentrei/ui/components/RoomMenu";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

import RoomCardStyles from "./RoomCardStyles";

export interface Props {
  profile: Profile.Get;
  room: Room.Get;
  space: Space.Get;
  user: User.Get;
}

export default function RoomCard({
  profile,
  room,
  space,
  user,
}: Props): JSX.Element {
  const classes = RoomCardStyles();
  const {snackbar} = useSnackbar();
  const {t} = useTranslation();

  const [roomAnchorEl, roomSetAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );
  const [members, setMembers] = React.useState<
    Member.Get[] | null | undefined
  >();

  const handleRoomClick = (event: React.MouseEvent<HTMLElement>): void => {
    roomSetAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    roomSetAnchorEl(null);
  };

  React.useEffect(() => {
    if (room.memberCount > 0) {
      const unsubscribe = getMembersLive("rooms", room.id, snap => {
        setMembers(snap);
      });
      return (): void => {
        unsubscribe();
      };
    }
    return (): void => {};
  }, [room]);

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.placeholder}>
        <Link
          href="/[spaceId]/room/[roomId]"
          as={`/${space.id}/room/${room.id}`}
        >
          {room.photo ? (
            <CardMedia className={classes.media} image={room.photo} />
          ) : (
            <Box className={classes.media} />
          )}
        </Link>
      </CardActionArea>
      <CardContent>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={1} sm={1} md={1}>
            <RoomCardEmojiPicker
              emoji={room.emoji}
              profile={profile}
              roomId={room.id}
              userId={user.uid}
            />
          </Grid>
          <Grid item xs={6} sm={7} md={8}>
            <Typography
              component="h3"
              variant="h4"
              align="center"
              color="textPrimary"
              noWrap
              gutterBottom
            >
              {room.name}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={1} md={1}>
            <CopyToClipboard
              text={`${window.location.href}/room/${room.id}`}
              onCopy={(): void =>
                snackbar("success", t("common:snackbar.clipboard"))
              }
            >
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CopyToClipboard>
          </Grid>
          <Grid item xs={2} sm={2} md={1}>
            <IconButton
              aria-label="more"
              edge="end"
              aria-haspopup="true"
              onClick={handleRoomClick}
            >
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
        <RoomMenu
          anchorEl={roomAnchorEl}
          open={Boolean(roomAnchorEl)}
          onClose={handleClose}
          roomId={room.id}
          spaceId={space.id}
        />
        <Box p={1} />
        <div className={classes.container}>
          <Grid container direction="row" justify="space-around">
            <Grid item xs={9}>
              <AvatarGroup max={3}>
                {members
                  ? members
                      .slice(0, 3)
                      .map(member => (
                        <ProfileCard key={member.username} member={member} />
                      ))
                  : [...Array(room.memberCount)].map(e => (
                      <Skeleton key={e} variant="circle">
                        <Avatar />
                      </Skeleton>
                    ))}
              </AvatarGroup>
            </Grid>
            <Grid item xs={3}>
              <Link
                href="/[spaceId]/room/[roomId]"
                as={`/${space.id}/room/${room.id}`}
              >
                <Button fullWidth variant="outlined" color="primary">
                  {t("common:common.visit")}
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}
