import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            shareTransferPackageStatus: false,
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
                current_studio_id: '',
                customer_details: {
                    images: []
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
                }
            }
        })
    })
}

export default createStore
