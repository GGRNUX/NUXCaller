import axios from "axios";
const SmsService = {

    sendMessage: function ({ cellphone, message }) {

        const fetchAPI = async () => {
            axios.get(`http://192.168.20.126/cgi/WebCGI?1500101=account=apiuser&password=apipass&port=1&destination=${cellphone}&content=${message}`)
            .then(res => {
                if (res.cod === "404") {
                    alert('error')
                }
            })
            console.log("Enviando MENSAJE")
        }
        fetchAPI();
    },
    sender: function (message) {
        const cellphoneList = JSON.parse(sessionStorage.getItem("nums"))
        const size = (cellphoneList.length - 1)
        for (var i = 0; i <= size; i++) {
            const cellphone = (cellphoneList[i])
            console.log(cellphone[0])
            this.sendMessage({ cellphone: cellphone, message: message })
        }
    }
};

export default SmsService;