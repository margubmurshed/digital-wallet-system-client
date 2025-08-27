import { driver } from "driver.js";

export function createLandingTour() {
    return driver({
        showProgress: true,
        allowClose: true,
        nextBtnText: "Next",
        prevBtnText: "Back",
        doneBtnText: "Complete",
        steps: [
            {
                element: "#nav-menu",
                popover: {
                    title: "Navigation Menu",
                    description: "Use this to switch between sections.",
                    side: "right",
                    align: "start"
                }
            },
            {
                element: "#theme-toggler",
                popover: {
                    title: "Theme Toggle",
                    description: "Switch between light and dark mode.",
                    side: "left",
                }
            }
        ]
    })
}
export function createDashboardIndexTour() {
    return driver({
        showProgress: true,
        allowClose: true,
        nextBtnText: "Next",
        prevBtnText: "Back",
        doneBtnText: "Complete",
        steps: [
            {
                element: "#stats-cards",
                popover: {
                    title: "Dashboard Stats",
                    description: "Quick summary of user, agent & transaction data.",
                    side: "right",
                    align: "start"
                }
            },
            {
                element: "#chart-section",
                popover: {
                    title: "Charts",
                    description: "Visualization of trends with charts.",
                    side: "top",
                }
            }
        ]
    })
}
export function createManageUsersTour() {
    return driver({
        showProgress: true,
        allowClose: true,
        nextBtnText: "Next",
        prevBtnText: "Back",
        doneBtnText: "Complete",
        steps: [
            {
                element: "#table",
                popover: {
                    title: "Users Table",
                    description: "Showing users data using the table.",
                    side: "left",
                }
            },
            {
                element: "#filters",
                popover: {
                    title: "Filters",
                    description: "Filter users by selecting time & status.",
                    side: "top",
                }
            },
            {
                element: "#update-status",
                popover: {
                    title: "Update user status",
                    description: "Select user status from the dropdown & it will automatically update the status.",
                    side: "left",
                }
            },
        ]
    })
}
export function createManageAgentsTour() {
    return driver({
        showProgress: true,
        allowClose: true,
        nextBtnText: "Next",
        prevBtnText: "Back",
        doneBtnText: "Complete",
        steps: [
            {
                element: "#table",
                popover: {
                    title: "Agents Table",
                    description: "Showing agents data using the table.",
                    side: "left",
                }
            },
            {
                element: "#filters",
                popover: {
                    title: "Filters",
                    description: "Filter agents by selecting time & status.",
                    side: "top",
                }
            },
            {
                element: "#update-status",
                popover: {
                    title: "Update agent status",
                    description: "Select agent status from the dropdown & it will automatically update the status.",
                    side: "left",
                }
            },
        ]
    })
}

export function createManageTransactionTour() {
    return driver({
        showProgress: true,
        allowClose: true,
        nextBtnText: "Next",
        prevBtnText: "Back",
        doneBtnText: "Complete",
        steps: [
            {
                element: "#table",
                popover: {
                    title: "Transactions Table",
                    description: "Showing transactions made by user and agents.",
                    side: "left",
                }
            },
            {
                element: "#filters",
                popover: {
                    title: "Filters",
                    description: "Filter transactions by selecting the options.",
                    side: "top",
                }
            },
            {
                element: "#filter-by-amount",
                popover: {
                    title: "Filter transactions by amount",
                    description: "Enter min value or max value or both.",
                    side: "right",
                }
            },
        ]
    })
}