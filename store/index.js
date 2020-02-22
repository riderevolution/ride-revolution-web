import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
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
            proTipStatus: false,
            loginSignUpStatus: false,
            isExpanded: false,
            errorStatus: false,
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
