import {NimblePicker} from "emoji-mart";
import data from "emoji-mart/data/twitter.json";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import useDarkMode from "use-dark-mode";

import EmojiMartStyled from "./EmojiMartStyled";

export default function EmojiMart(): JSX.Element {
  const {t} = useTranslation();
  const {value: isDark} = useDarkMode(false);

  return (
    <EmojiMartStyled>
      <NimblePicker
        title={t("common:common.pickYourEmoji")}
        emoji="point_up"
        theme={isDark ? "dark" : "light"}
        set="twitter"
        // @ts-ignore
        data={data}
      />
    </EmojiMartStyled>
  );
}
