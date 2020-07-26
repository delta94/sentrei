/* eslint-disable @typescript-eslint/no-var-requires */

import * as React from "react";

import styled from "styled-components";

import Props from "@sentrei/types/components/PictureSvg";

const StyledImg = styled.img`
  max-width: 100%;
  pointer-events: none;
  user-select: none;
`;

export default function PictureSvg({alt, src}: Props): JSX.Element {
  return (
    <picture>
      <StyledImg alt={alt} src={src} />
    </picture>
  );
}
