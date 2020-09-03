import React, { useState } from "react";
import { rem } from "polished";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BlueButton,
  RedButton,
  RoundGreyButton,
} from "../../../../style/GlobalButtons";
import { Styledh2 } from "../../../../style/GlobalTitles";
import GenericDeleteModal from "../../Modals/GenericDeleteModal/GenericDeleteModal";
import ReactTooltip from "react-tooltip";
import {
  resendChallengeInvitationAction,
  resendChallengeResultAction,
} from "../../../../store/actions/challengeActions";
import { useDispatch } from "react-redux";
import { GenericSpinnerSmallBtn } from "../../GenericSpinner";
import GenericChallengeCardManageBig from "./CardManageBig";

//////////
// STYLES
//////////

const ChallengeCard = styled.div`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 16px;
  height: ${rem("100px")};
  margin-bottom: 8px;

  overflow: hidden;
  > div:first-child {
    min-width: 20px;
  }
  > div:last-child {
    display: flex;
    justify-content: space-between;
  }
`;

const ChallengeInfo = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  min-width: 200px;
  height: 100%;
  p:last-child {
    font-size: 14px;
  }
`;

const ChallengeInfoAmple = styled.div`
  display: inline-flex;
  flex-direction: row;
  min-width: 200px;
  height: 100%;
  p:last-child {
    font-size: 14px;
  }
`;

const Challengeh2 = styled(Styledh2)`
  font-size: ${rem("18px")};
`;

const ChallengeRightContainer = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-between;
  > div:last-child {
    width: 180px;
    display: flex;
    justify-content: space-between;
  }
`;

const DeleteButton = styled(RedButton)`
  padding: 8px;
  width: ${rem("34px")};
  height: ${rem("34px")};
`;

const SendButton = styled(BlueButton)`
  padding: 8px;
  width: ${rem("34px")};
  height: ${rem("34px")};
  //margin-left: 32px;
  overflow: hidden;

  * {
    overflow: hidden;
  }
`;

const AmpleLight = styled.div`
  width: ${rem("8px")};
  height: ${rem("34px")};
  margin-right: 8px;
`;
const RoundGreyButtonSmart = styled(RoundGreyButton)`
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  // cursor: ${(props) => (props.disabled ? "not-allowed" : "not-allowed")};
`;

//////////
// REACT
//////////

const GenericChallengeCardManage = ({ challenge }) => {
  const dispatch = useDispatch();
  //open close challenge
  const [isChallengeReviewing, setChallengeReviewing] = useState(false);
  const reviewChallengeHandler = () => {
    setChallengeReviewing(!isChallengeReviewing);
  };
  // Used to toggle the delete Challenge Card modal
  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
  const ModalDeleteOpenCloseHandler = () => {
    setModalDeleteOpen(!isModalDeleteOpen);
  };
  // Used to manage icon displayed on resend buttons during request
  const [resultStatus, setResultStatus] = useState(false);
  const [inviteStatus, setInviteStatus] = useState(false);
  // Used by Resend Invitation Email button
  const resendInvitationEmail = async (e) => {
    e.preventDefault();
    setInviteStatus(true);
    await dispatch(resendChallengeInvitationAction(challenge.id));
    setInviteStatus(false);
  };
  // Used by Resend Results Email button
  const resendResultEmail = async (e) => {
    e.preventDefault();
    setResultStatus(true);
    await dispatch(resendChallengeResultAction(challenge.id));
    setResultStatus(false);
  };
  // Conditionally change the background colors of the cards based on Status
  const renderBackground = () => {
    if (challenge.status === "PASSED") {
      return {
        backgroundColor: "green",
      };
    }
    if (challenge.status === "FAILED") {
      return {
        backgroundColor: "#ef485c",
      };
    }
    if (challenge.status === "NEEDS REVIEW") {
      return {
        background: "#E6D317",
      };
    }
    return {
      background: "#00bae5",
    };
  };

  return (
    <>
      {isChallengeReviewing ? (
        <GenericChallengeCardManageBig
          challenge={challenge}
          reviewChallengeHandler={reviewChallengeHandler}
          ModalDeleteOpenCloseHandler={ModalDeleteOpenCloseHandler}
          isModalDeleteOpen={isModalDeleteOpen}
          resendResultEmail={resendResultEmail}
          resultStatus={resultStatus}
          resendInvitationEmail={resendInvitationEmail}
          inviteStatus={inviteStatus}
        />
      ) : (
        <ChallengeCard>
          <div>
            <Challengeh2>{`Full Stack - Challenge #${challenge.id}`}</Challengeh2>
          </div>
          <ChallengeRightContainer>
            <ChallengeInfoAmple>
              <AmpleLight style={renderBackground()}/>
              <div>
                <p>
                  Candidate:{" "}
                  {`${challenge.candidate.first_name} ${challenge.candidate.last_name}`}
                </p>
                <p>Status: {challenge.status}</p>
              </div>
            </ChallengeInfoAmple>
            <ChallengeInfo>
              <p>Created: {challenge.created.slice(0, 10)}</p>
              <p>
                Created by:{" "}
                {`${challenge.creator.first_name} ${challenge.creator.last_name}`}
              </p>
            </ChallengeInfo>
            <div>
              <DeleteButton
                onClick={ModalDeleteOpenCloseHandler}
                data-tip="Delete Challenge"
              >
                <FontAwesomeIcon icon={["far", "trash-alt"]} />
                <ReactTooltip place="top" type="dark" effect="solid" />
              </DeleteButton>
              {isModalDeleteOpen ? (
                <GenericDeleteModal
                  ModalDeleteOpenCloseHandler={ModalDeleteOpenCloseHandler}
                  type="challenges"
                  typeId={challenge.id}
                  from="managechallenges"
                >
                  <p>{`Are you sure you want to delete the Challenge #${challenge.id}`}</p>
                </GenericDeleteModal>
              ) : null}
              {challenge.status === "PASSED" ||
              challenge.status === "FAILED" ||
              challenge.status === "NEEDS REVIEW" ? (
                <SendButton
                  data-tip="Resend Challenge Score Email"
                  onClick={resendResultEmail}
                >
                  {resultStatus ? (
                    <GenericSpinnerSmallBtn />
                  ) : (
                    <FontAwesomeIcon icon={["fas", "trophy"]} />
                  )}
                  <ReactTooltip place="top" type="dark" effect="solid" />
                </SendButton>
              ) : (
                <SendButton
                  data-tip="Resend Challenge Invitation Email"
                  onClick={resendInvitationEmail}
                >
                  {inviteStatus ? (
                    <GenericSpinnerSmallBtn />
                  ) : (
                    <FontAwesomeIcon icon={["fas", "envelope-open-text"]} />
                  )}
                  <ReactTooltip place="top" type="dark" effect="solid" />
                </SendButton>
              )}
              {challenge.status === "CREATED" || challenge.status === "SENT" ? (
                <RoundGreyButtonSmart
                  disabled={true}
                  onClick={reviewChallengeHandler}
                >
                  <p>?</p>
                </RoundGreyButtonSmart>
              ) : (
                <RoundGreyButton onClick={reviewChallengeHandler}>
                  <p>?</p>
                </RoundGreyButton>
              )}
            </div>
          </ChallengeRightContainer>
        </ChallengeCard>
      )}
    </>
  );
};

export default GenericChallengeCardManage;
