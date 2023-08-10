$("#toggler").on("click", () => {
    if ($(".menu").attr("isOpen")) {
        $(".menu").removeAttr("isOpen")
        $(".menu").css("display", "none")
    } else {
        $(".menu").attr("isOpen", true)
        $(".menu").css("display", "flex")
    }
})

window.onresize = () => {
  if(window.innerWidth > 768) {
    $(".menu").removeAttr("isOpen")
    $(".menu").css("display", "flex")
  }
}