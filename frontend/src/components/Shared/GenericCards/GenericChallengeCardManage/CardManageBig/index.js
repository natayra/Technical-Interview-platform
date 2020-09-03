import React, {useState} from "react";
import {rem} from "polished";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    BaseButton,
    BlueButton,
    RedButton,
    RoundGreyButton,
} from "../../../../../style/GlobalButtons";
import {Styledh2} from "../../../../../style/GlobalTitles";
import {Controlled as CodeMirror} from "react-codemirror2";
import ReactTooltip from "react-tooltip";
import GenericDeleteModal from "../../../Modals/GenericDeleteModal/GenericDeleteModal";
import {GenericSpinnerSmallBtn} from "../../../GenericSpinner";
import {useDispatch} from "react-redux";
import {getTestCode} from "../../../../../store/actions/testActions";
import {compose} from "redux";

//////////
// STYLES
//////////

const ChallengeCardBig = styled.div`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 16px;
  height: ${rem("430px")};
  margin-bottom: 8px;
  flex-wrap: wrap;
  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div:first-child {
      min-width: 20px;
    }
    > div:last-child {
      display: flex;
      justify-content: space-between;
    }
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

const AmpleLight = styled.div`
  width: ${rem("8px")};
  height: ${rem("34px")};
  margin-right: 8px;
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

const ReviewInfoContainer = styled.div`
  display: flex;
  height: 300px;
`;

const ReviewInfoContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 28%;
`;

const ReviewInfoContainerRight = styled.div`
  margin-left: 12px;
  display: flex;
  height: 100%;
  width: 70%;
`;

const QuestionSelectorButton = styled(BaseButton)`
  border: ${(props) => (props.isActive ? "1px solid #9a9a9a" : "1px solid #dbdbdb")};
  text-align: left;
  height: ${rem("38px")};
  width: 100%;
  border-radius: 5px;
  color: #767676;
  background-color: #fff;
  //border: 1px solid #dbdbdb;
  font-size: ${rem("14px")};
  :hover {
    border: 1px solid #9a9a9a;
    color: #363636;
  }
`;

const StyledSmallCodeMirror = styled(CodeMirror)`
  * {
    font-size: 18px;
    font-family: "Courier New", Courier, monospace !important;
  }
  height: 100%;
  width: 100%;
  > div {
    height: 100%;
  }
`;

//////////
// REACT
//////////

const GenericChallengeCardManageBig = ({
                                           challenge,
                                           reviewChallengeHandler,
                                           ModalDeleteOpenCloseHandler,
                                           isModalDeleteOpen,
                                           resendResultEmail,
                                           resultStatus,
                                           resendInvitationEmail,
                                           inviteStatus,
                                       }) => {
    const dispatch = useDispatch();
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
    // Used to manage the local state of code to display in the CodeMirror display
    const [codeDisplay, setCodeDisplay] = useState("");
    // Used to manage the local state of border display during selecting Question
    const [buttonBorder, setButtonBorder] = useState(
        {0: false, 1: false, 2: false, 3: false, 4: false, 5: false})
    // Used by the Question buttons during the Get Candidate's Code request
    const onGetCode = async (e, question_id) => {
        e.preventDefault();
        setButtonBorder({0: false, 1: false, 2: false, 3: false, 4: false, 5: false, [e.target.id]: true})
        const challengeData = {
            question_id: question_id,
            candidate_id: challenge.candidate.id,
            first_name: challenge.candidate.first_name,
            last_name: challenge.candidate.last_name,
        };
        const response = await dispatch(getTestCode(challengeData));
        if (response.status === 200) {
            setCodeDisplay(response.data);
        }
    };

    return (
        <ChallengeCardBig>
            <div>
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
                            <FontAwesomeIcon icon={["far", "trash-alt"]}/>
                            <ReactTooltip place="top" type="dark" effect="solid"/>
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
                                    <GenericSpinnerSmallBtn/>
                                ) : (
                                    <FontAwesomeIcon icon={["fas", "trophy"]}/>
                                )}
                                <ReactTooltip place="top" type="dark" effect="solid"/>
                            </SendButton>
                        ) : (
                            <SendButton
                                data-tip="Resend Challenge Invitation Email"
                                onClick={resendInvitationEmail}
                            >
                                {inviteStatus ? (
                                    <GenericSpinnerSmallBtn/>
                                ) : (
                                    <FontAwesomeIcon icon={["fas", "envelope-open-text"]}/>
                                )}
                                <ReactTooltip place="top" type="dark" effect="solid"/>
                            </SendButton>
                        )}
                        <RoundGreyButton onClick={reviewChallengeHandler}>
                            <p>X</p>
                        </RoundGreyButton>
                    </div>
                </ChallengeRightContainer>
            </div>
            <ReviewInfoContainer>
                <ReviewInfoContainerLeft>
                    {challenge.questions.map((question, index) => {
                        return (
                            <QuestionSelectorButton
                                id={index}
                                key={`question ${question.id}`}
                                onClick={(e) => onGetCode(e, question.id)}
                                isActive={buttonBorder[index]}
                            >
                                {question.name}
                            </QuestionSelectorButton>
                        );
                    })}
                </ReviewInfoContainerLeft>
                <ReviewInfoContainerRight>
                    <StyledSmallCodeMirror
                        value={codeDisplay}
                        options={{
                            mode: "javascript",
                            theme: "material",
                            lineNumbers: true,
                        }}
                        onChange={(editor, data, value) => {
                        }}
                    />
                </ReviewInfoContainerRight>
            </ReviewInfoContainer>
        </ChallengeCardBig>
    );
};

export default GenericChallengeCardManageBig;
