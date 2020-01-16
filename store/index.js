import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            bookerAssignSuccessStatus: false,
            bookerAssignNonMemberStatus: false,
            bookerAssignMemberErrorStatus: false,
            bookerAssignMemberPromptStatus: false,
            bookerChoosePackageStatus: false,
            bookerAssignStatus: false,
            isExpanded: false,
            errorStatus: false,
            errorList: [],
            hiddenMobile: true,
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
