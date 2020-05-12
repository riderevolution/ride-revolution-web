import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            contactUsPromptStatus: false,
            bookerSwitchSeatStatus: false,
            bookerActionsPrompt: false,
            waitlistPrompt: false,
            buyPackageFirstStatus: false,
            imageViewerStatus: false,
            completeProfileSuccessStatus: false,
            loginCheckerStatus: false,
            shareEmailStatus: false,
            commentSuccessStatus: false,
            shareTransferPackageStatus: false,
            redeemGiftCardSuccessStatus: false,
            redeemGiftCardStatus: false,
            cancelClassStatus: false,
            deactivateAccountPromptStatus: false,
            changePasswordStatus: false,
            forgotPasswordSuccessStatus: false,
            waitlistedClassesPromptStatus: false,
            buyRidesSuccessStatus: false,
            buyRidesPromptStatus: false,
            bookerAssignSuccessStatus: false,
            bookerAssignNonMemberStatus: false,
            bookerAssignNonMemberErrorStatus: false,
            bookerAssignMemberErrorStatus: false,
            bookerAssignMemberPromptStatus: false,
            bookerChooseSeatStatus: false,
            bookerChoosePackageStatus: false,
            bookerAssignStatus: false,
            completeProfilePromptStatus: false,
            completeProfileHealthStatus: false,
            completeProfileStepsStatus: false,
            completeProfileStatus: false,
            proTipStatus: false,
            loginSignUpStatus: false,
            isExpanded: false,
            errorOverlayPromptStatus: false,
            errorPromptStatus: false,
            errorList: [],
            isAuth: false,
            isNotify: false,
            notificationMessage: '',
            isDeleteShow: false,
            contentLoaded: false,
            isLoading: false,
            token: '',
            customerID: 0,
            user: {
                first_name: '',
                last_name: '',
                current_studio_id: '',
                customer_details: {
                    images: [
                        {
                            id: 0,
                            path: ''
                        }
                    ]
                },
                staff_details: {
                    studio_access: [
                        {
                            studio: {}
                        }
                    ],
                    role: {
                        display_name: '',
                    }
                },
                store_credits: []
            }
        })
    })
}

export default createStore
