import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            hasUpdateProfile: false,
            newUser: false,
            oldUser: false,
            shareSuccess: false,
            onlinePromptStatus: false,
            viewImageUrl: '',
            inApp: '',
            articleAlertStatus: true,
            resendEmailPrompt: false,
            oldUserEmail: '',
            oldUserUpdatePrompt: false,
            videoPrompt: false,
            showComplianceStatus: false,
            checkBrowserStatus: false,
            badgePromptStatus: false,
            fromManageClass: false,
            bookerPromptStatus: false,
            contactUsPromptStatus: false,
            bookerCancelStatus: false,
            bookerActionsPrompt: false,
            bookerActionsPrompt: false,
            waitlistPrompt: false,
            buyOnlinePackageFirstStatus: false,
            buyPackageFirstStatus: false,
            imageViewerStatus: false,
            completeProfileSuccessStatus: false,
            loginCheckerStatus: false,
            shareEmailStatus: false,
            commentSuccessStatus: false,
            unSharePackageStatus: false,
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
            bookerSwitchSeatStatus: false,
            bookerAssignStatus: false,
            bookerRemoveBookingStatus: false,
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
            isMobile: false,
            isLoading: false,
            token: '',
            customerID: 0,
            badges: [],
            lastRoute: '',
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
