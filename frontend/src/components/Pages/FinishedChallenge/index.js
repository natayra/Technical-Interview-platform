import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import { Styledh1 } from "../../../style/GlobalTitles/index";
import {
  BaseContainer,
  PageContainer,
} from "../../../style/GlobalWrappers/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//////////
// STYLE
//////////

const P = styled.p`
  font-weight: normal;
  font-size: 20px;
  text-align: justify;
`;

const H2 = styled.h2`
  font-weight: 700;
  font-size: 20px;
  text-align: justify;
`;

const InformationContainer = styled.div`
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  min-width: 200px;
`;

const ExampleImage = styled.div`
  min-height: ${rem("535px")};
  min-width: ${rem("620px")};
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("https://thumbs.gfycat.com/ClassicImaginaryFalcon-size_restricted.gif");
`;

const ChallengeDoneContainer = styled(BaseContainer)`
  display: inline-flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding: 24px 24px 0 24px;
`;

const LeftSideContainer = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  height: ${rem("535px")};
  min-width: 920px;
  height: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  margin-right: 24px;
  margin-bottom: 24px;
`;

const ChallengeDone = styled.div`
  width: 100%;
  height: 100%;
  text-justify: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  div:first-child p {
    font-size: 20px;
  }
`;

const RightSideContainer = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  min-width: 320px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const Instructionh1 = styled(Styledh1)`
  padding-top: 0px;
  font-size: ${rem("40px")};
`;

const Pcode = styled.p`
  font-size: 36px;
  font-family: "Courier New", Courier, monospace !important;
`;

const FontAwesomeIconWrapper = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  font-size: 122px;
`;

//////////
// REACT
//////////

const FinishedChallenge = () => {
  return (
    <PageContainer>
      <InformationContainer>
        <Styledh1>Done!</Styledh1>
        <ChallengeDoneContainer>
          <LeftSideContainer>
            <ExampleImage />
          </LeftSideContainer>
          <RightSideContainer>
            <ChallengeDone>
              <div>
                <Instructionh1>
                  Thanks for submitting your challenge!
                </Instructionh1>
                <br />
                <p>
                  You will receive an email in your mailbox with information
                  about the challenge results.
                </p>
              </div>
              <FontAwesomeIconWrapper>
                <FontAwesomeIcon icon={["far", "paper-plane"]} />
                <Pcode>{"{Keep coding!}"}</Pcode>
              </FontAwesomeIconWrapper>
            </ChallengeDone>
          </RightSideContainer>
        </ChallengeDoneContainer>
      </InformationContainer>
    </PageContainer>
  );
};

export default FinishedChallenge;
