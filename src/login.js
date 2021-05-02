class LoginPage {
    session_name = null
    profile_name = null
    use_private_key = null

    constructor(session_name, profile_name) {
        this.session_name = session_name
        this.profile_name = profile_name

        // const login_page =

        const login_div = document.getElementById(`${session_name}-login`)
        // TODO: replace these <br> with CSS
        // TODO: refactor the styles into CSS
        login_div.innerHTML = `
<br>
<br>
<br>
<br>
<div class="ui placeholder segment" style="width: 60%; margin-left: auto; margin-right: auto">
    <div class="ui two column grid">
        <div class="column">
            <form id="${session_name}-login_form" class="ui form">
                <div class="field">
                    <label>Username</label>
                    <div class="ui left icon input">
                        <input id="${session_name}-username" placeholder="Username" type="text">
                        <i class="user icon"></i>
                    </div>
                </div>
                <div class="field">
                    <label>Password</label>
                    <div class="ui left icon input">
                        <input id="${session_name}-password" placeholder="Password" type="password">
                        <i class="lock icon"></i>
                    </div>
                </div>
                <div class="field">
                    <label>Server</label>
                    <select id="${session_name}-server_dropdown" class="ui search dropdown">
                      <option value="">Select Server</option>
                    </select>
                </div>
                <div class="field">
                    <div class="ui toggle checkbox">
                        <input id="${session_name}-save_key" type="checkbox">
                        <label>Remember Password</label>
                    </div>
                </div>
                <button class="ui blue button" type="submit">Login</button>
            </form>
        </div>
        <div class="column">
<!--            <div class="ui vertical steps">-->
<!--                <div class="completed step">-->
<!--                    <i class="truck icon"></i>-->
<!--                    <div class="content">-->
<!--                        <div class="title">Shipping</div>-->
<!--                        <div class="description">Choose your shipping options</div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="completed step">-->
<!--                    <i class="credit card icon"></i>-->
<!--                    <div class="content">-->
<!--                        <div class="title">Billing</div>-->
<!--                        <div class="description">Enter billing information</div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="active step">-->
<!--                    <i class="info icon"></i>-->
<!--                    <div class="content">-->
<!--                        <div class="title">Confirm Order</div>-->
<!--                        <div class="description">Verify order details</div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
            <form id="${session_name}-vnc_form" class="ui form">
                <button class="ui yellow button" type="submit">Connect VNC</button>
<!--                <div class="field">-->
<!--                    <label>Reset VNC</label>-->
<!--                    <div class="ui slider checkbox" style="margin-top: 12px; margin-bottom: 6px">-->
<!--                        <input name="newsletter" type="checkbox">-->
<!--                        <label>Reset the VNC</label>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="field">-->
<!--                    <label>New VNC Password</label>-->
<!--                    <div class="ui left icon input">-->
<!--                        <input placeholder="New password" type="text">-->
<!--                        <i class="lock icon"></i>-->
<!--                    </div>-->
<!--                </div>-->
            </form>
        </div>
    </div>
    <div class="ui vertical divider">
        ${profile_name}
    </div>
</div>
    `
        const server_dropdown = document.getElementById(`${session_name}-server_dropdown`)
        // const empty_server_option = document.createElement("option")
        // server_dropdown.appendChild(empty_server_option)
        // empty_server_option.value = " "
        for (const server of PROFILES[profile_name]["servers"]) {
            const server_option = document.createElement("option")
            server_dropdown.appendChild(server_option)
            server_option.value = server
            server_option.innerText = server
        }

        // register login callback
        const login_form = document.getElementById(`${session_name}-login_form`)
        login_form.onsubmit = () => {
            return this.actLogin()
        }

        // register vnc callback
        const vnc_form = document.getElementById(`${session_name}-vnc_form`)
        vnc_form.onsubmit = () => {
            return this.actVNC()
        }
    }

    loadFields(last_server, username, has_private_key, has_vnc_passwd) {
        const server_dropdown = document.getElementById(`${this.session_name}-server_dropdown`)
        server_dropdown.value = last_server
        const username_input = document.getElementById(`${this.session_name}-username`)
        username_input.value = username

        this.use_private_key = has_private_key
        if (has_private_key) {
            const password_input = document.getElementById(`${this.session_name}-password`)
            password_input.setAttribute("placeholder", "●●●●●●●●")
            const save_key_checkbox = document.getElementById(`${this.session_name}-save_key`)
            save_key_checkbox.checked = true
        }
        // TODO: handle has_vnc_passwd
        // if (has_vnc_passwd){
        //     const vncpass = document.getElementById(`${this.session_name}-password`)
        //     password_input.value = "********"
        // }

    }

    actLogin() {
        const server = document.getElementById(`${this.session_name}-server_dropdown`).value
        console.log(server)
        if (server === "") {
            // pick a random server if the user doesn't input one
            const server_elem = document.getElementById(`${this.session_name}-server_dropdown`)
            const servers_list = PROFILES[this.profile_name]["servers"]
            server_elem.value = servers_list[Math.floor(Math.random() * servers_list.length)]
            semantic_flush_dropdowns()
        }
        const username = document.getElementById(`${this.session_name}-username`).value
        const password = document.getElementById(`${this.session_name}-password`).value
        const save_key = document.getElementById(`${this.session_name}-save_key`).checked
        const value = {
            "session": this.session_name,
            "server": server,
            "username": username,
            "passwd": password,
            "save_key": save_key
        }
        send_msg("login", value)
        return false
    }

    actVNC(){
        const value = {
            "session": this.session_name,
            "passwd": ""
        }
        send_msg("vnc", value)

        return false
    }

    actDisconnect() {

    }
}

module.exports.LoginPage = LoginPage