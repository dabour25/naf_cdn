(function($) {
  'use strict';
  $.fn.andSelf = function() {
    return this.addBack.apply(this, arguments);
  }
  $(function() {

    //check all boxes in order status
    $("#check-all").click(function () {
      $(".form-check-input").prop('checked', $(this).prop('checked'));
    });

    if ($("#transaction-history").length) {
      const doughnutChartCanvas = document.getElementById('transaction-history');
      new Chart(doughnutChartCanvas, {
        type: 'doughnut',
        data: {
          labels: ["تاب", "paylink","اخرى"],
          datasets: [{
              data: [tap_earnings, paylink_earnings,others_earnings],
              backgroundColor: [
                 "#8f5fe8","#00d25b","#ffab00",
              ],
              borderColor: "#191c24"
          }]
        },
        options: {
          cutout: 70,
          animationEasing: "easeOutBounce",
          animateRotate: true,
          animateScale: false,
          responsive: true,
          maintainAspectRatio: true,
          showScale: false,
          legend: false,
          plugins: {
            legend: {
                display: false,
            },
          },
        },
      });
    }
    if ($('#owl-carousel-basic').length) {
      $('#owl-carousel-basic').owlCarousel({
        loop: true,
        margin: 10,
        dots: false,
        nav: true,
        autoplay: true,
        autoplayTimeout: 4500,
        navText: ["<i class='mdi mdi-chevron-left'></i>", "<i class='mdi mdi-chevron-right'></i>"],
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 1
          },
          1000: {
            items: 1
          }
        }
      });
    }
    var selectedReg=[];
    var map = new jsVectorMap({
      selector: "#audience-map",
      map: "world",
      onRegionTooltipShow(event, tooltip, code) {
          for(let i=0;i<countries.length;i++){
              if(i<5){
                  selectedReg.push(countries[i].countryCode);
              }
              if ([countries[i].countryCode].indexOf(code) > -1) {
                  tooltip.text(countries[i].countryName+'<br>'+countries[i].users_count,true);
              }
          }
      },
      regionStyle: {
        selected: { fill: '#525c70' },
        initial: {
          fill: '#6b6b6b',
          stroke: "#676767",
          strokeWidth: 0.7,
          fillOpacity: 1
        }
      }
    });

    for(let i=0;i<5;i++){
        if(countries[i].users_count>0)
            selectedReg.push(countries[i].countryCode);
    }
    map.setSelectedRegions(selectedReg);

    if ($('#owl-carousel-rtl').length) {
      $('#owl-carousel-rtl').owlCarousel({
        loop: true,
        margin: 10,
        dots: false,
        nav: true,
        rtl: isrtl,
        autoplay: true,
        autoplayTimeout: 4500,
        navText: ["<i class='mdi mdi-chevron-right'></i>", "<i class='mdi mdi-chevron-left'></i>"],
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 1
          },
          1000: {
            items: 1
          }
        }
      });
    }
    if ($("#currentBalanceCircle").length) {
      var bar = new ProgressBar.Circle(currentBalanceCircle, {
        color: '#ccc',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 12,
        trailWidth: 12,
        trailColor: '#0d0d0d',
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: false,
        },
        from: { color: '#d53f3a', width: 12 },
        to: { color: '#d53f3a', width: 12 },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);

          var value = Math.round(circle.value() * 100);
          circle.setText('');

        }
      });

      bar.text.style.fontSize = '1.5rem';

      bar.animate(0.4);  // Number from 0.0 to 1.0
    }
  });
})(jQuery);

(() => {
    window.addEventListener('DOMContentLoaded', () => {
        const colorModeSwitch = document.getElementById('colorModeSwitch');
        if (colorModeSwitch) {
            colorModeSwitch.addEventListener('change', () => {
                document.body.setAttribute('data-bs-theme', colorModeSwitch.checked ? 'light' : 'dark');
                setCookie('theme',colorModeSwitch.checked ? 'light' : 'dark',60);
            });
        }
    });
})();

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

$('.app-sort').on('keyup', function() {
    const selectId = $(this).attr('id');
    const selectedValue = $(this).val();
    if(selectedValue!==''){
        let messageElement=document.getElementById('toast-message');
        $.ajax({
            url: "/admin/apps/"+selectId+"/sort?sort="+selectedValue,
            type: "GET",
            contentType: "application/json",
            success: function (response) {
                messageElement.innerHTML=JSON.stringify(response);
                messageElement.style.display = 'block';
                setTimeout(() => {
                    messageElement.style.display = 'none';
                }, 6000);

            },
            error: function (xhr, status, error) {
                let errorMessage="";
                if (xhr.responseJSON) {
                    errorMessage = xhr.responseJSON;
                } else if (xhr.responseText) {
                    errorMessage = xhr.responseText;
                }
                messageElement.innerHTML=errorMessage;
                messageElement.style.display = 'block';
                setTimeout(() => {
                    messageElement.style.display = 'none';
                }, 6000);
            }
        });
    }
});

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

$("#rand-btn").click(function (){
    let count=$("#rand-input").val();
    if(count===""||count===0||isNaN(count)){
        Swal.fire({
            icon: "error",
            title: "خطأ...",
            text: "العدد يجب ان يكون رقماً وأكبر من صفر",
            confirmButtonText: "حسناً",
        });
    }else{
        let codes=[];
        for(let i=0;i<count;i++){
            codes.push(makeCode(8));
        }
        let textAreaValue = codes.join('\n');
        $("#codes-text").val(textAreaValue);
        $("#rand-input").val("");
    }
});

function makeCode(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&$%@!*';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

$("#promo-filter-btn").click(function (){
    let filterText="";
    if($("#code-filter").val()!==""){
        filterText+="code="+$("#code-filter").val()+"&";
    }
    if($("#user-filter").val()!==""){
        filterText+="user="+$("#user-filter").val()+"&";
    }
    if($("#status-filter").val()!==""){
        filterText+="status="+$("#status-filter").val()+"&";
    }
    if($("#type-filter").val()!==""){
        filterText+="type="+$("#type-filter").val()+"&";
    }
    location.href="/admin/promo?"+filterText.slice(0, -1);
});

$("#users-filter-btn").click(function (){
    let filterText="";
    if($("#username-filter").val()!==""){
        filterText+="name="+$("#username-filter").val()+"&";
    }
    if($("#phone-filter").val()!==""){
        filterText+="phone="+$("#phone-filter").val()+"&";
    }
    if($("#status-filter").val()!==""){
        filterText+="status="+$("#status-filter").val()+"&";
    }
    if($("#active-filter").val()!==""){
        filterText+="activity="+$("#active-filter").val()+"&";
    }
    location.href="/admin/users?"+filterText.slice(0, -1);
});

$("#transaction-filter-btn").click(function (){
    let filterText="";
    if($("#transaction-aim").val()!==""){
        filterText+="aim="+$("#transaction-aim").val()+"&";
    }
    if($("#transaction-method").val()!==""){
        filterText+="method="+$("#transaction-method").val()+"&";
    }
    if($("#transaction-user").val()!==""){
        filterText+="user="+$("#transaction-user").val()+"&";
    }
    if($("#transaction-slug").val()!==""){
        filterText+="slug="+$("#transaction-slug").val()+"&";
    }
    if($("#transaction-status").val()!==""){
        filterText+="status="+$("#transaction-status").val()+"&";
    }
    location.href="/admin/payments?"+filterText.slice(0, -1);
});

$("#apps-filter").click(function (){
    let filterText="";
    if($("#app-title").val()!==""){
        filterText+="title="+$("#app-title").val()+"&";
    }
    if($("#app-status").val()!==""){
        filterText+="status="+$("#app-status").val()+"&";
    }
    location.href="/admin/apps?"+filterText.slice(0, -1);
});

$("#groups-filter").click(function (){
    let filterText="";
    if($("#groups-title").val()!==""){
        filterText+="title="+$("#groups-title").val()+"&";
    }
    if($("#groups-status").val()!==""){
        filterText+="status="+$("#groups-status").val()+"&";
    }
    if($("#groups-cert-id").val()!==""){
        filterText+="certificate_id="+$("#groups-cert-id").val()+"&";
    }
    location.href="/admin/groups?"+filterText.slice(0, -1);
});

$("#device-filter").click(function (){
    let filterText="";
    if($("#device-udid").val()!==""){
        filterText+="udid="+$("#device-udid").val()+"&";
    }
    if($("#device-type").val()!==""){
        filterText+="device_type="+$("#device-type").val()+"&";
    }
    location.href="/admin/devices?"+filterText.slice(0, -1);
});

$("#tap-click").click(function(){
    $("#paylink-click").removeClass("active-tab");
    $("#tap-click").addClass("active-tab");
    $("#paypal-click").removeClass("active-tab");
    $("#pay-m").html("Tap");
    $("#const-payment-form").attr('action','/admin/const-payments/tap');
    $("#pay-app").hide();
    $("#api_key").val(defaultMethods[0].api_key);
    $("#app_id").val("");
    if(defaultMethods[0].active===1) {
        $("#active-method-const").prop('checked', true);
        $("#create-method-active-const").text('مُفعلة');
    }else {
        $("#active-method-const").prop('checked', false);
        $("#create-method-active-const").text('مُعطلة');
    }
});

$("#paylink-click").click(function(){
    $("#paylink-click").addClass("active-tab");
    $("#tap-click").removeClass("active-tab");
    $("#paypal-click").removeClass("active-tab");
    $("#pay-m").html("Paylink");
    $("#const-payment-form").attr('action','/admin/const-payments/paylink');
    $("#pay-app").show();
    $("#api_key").val(defaultMethods[1].api_key);
    $("#app_id").val(defaultMethods[1].app_id);
    if(defaultMethods[1].active===1) {
        $("#active-method-const").prop('checked', true);
        $("#create-method-active-const").text('مُفعلة');
    }else {
        $("#active-method-const").prop('checked', false);
        $("#create-method-active-const").text('مُعطلة');
    }
});

$("#paypal-click").click(function(){
    $("#paylink-click").removeClass("active-tab");
    $("#tap-click").removeClass("active-tab");
    $("#paypal-click").addClass("active-tab");
    $("#pay-m").html("Paypal Email");
    $("#const-payment-form").attr('action','/admin/const-payments/paypal');
    $("#pay-app").hide();
    $("#api_key").val(defaultMethods[2].api_key);
    $("#app_id").val("");
    if(defaultMethods[2].active===1) {
        $("#active-method-const").prop('checked', true);
        $("#create-method-active-const").text('مُفعلة');
    }else {
        $("#active-method-const").prop('checked', false);
        $("#create-method-active-const").text('مُعطلة');
    }
});

$("#active-method").change(function (){
    if($(this).is(':checked')){
        $("#create-method-active").text('مُفعلة');
    }else{
        $("#create-method-active").text('مُعطلة');
    }
});

$("#active-method-const").change(function (){
    if($(this).is(':checked')){
        $("#create-method-active-const").text('مُفعلة');
    }else{
        $("#create-method-active-const").text('مُعطلة');
    }
});

function copyClip (code) {
    const $temp = $("<textarea>");
    $("body").append($temp);
    $temp.val(code).select();

    document.execCommand("copy");
    $temp.remove();
    Swal.fire({
        title: "نجاح",
        text: "تم نسخ الكود الى الحافظة",
        icon: "success"
    });
}

$(document).ready(function () {
    const $dropZone = $('#drop-zone');
    const $fileInput = $('#file-input');
    const $fileList = $('#file-list');
    const $uploadButton = $('#upload-button');
    let filesArray = [];

    // Render File List
    function renderFileList() {
        $fileList.empty();
        filesArray.forEach((file, index) => {
            $fileList.append(`<div class="file-uploaded">
            <img src="../assets/dashboard/images/file-icons/file.png" width="60px">
             <span>${file.name}</span>
             <span style="position: absolute; left: 15px;top:22px;font-size: 25px;cursor: pointer;" class="remove-file" data-index="${index}"><i class="mdi mdi-close-circle"></i></span>
             </div>`
            );
        });
    }

    // Remove File
    $fileList.on('click', '.remove-file', function () {
        const index = $(this).data('index');
        filesArray.splice(index, 1);
        renderFileList();
    });

    // Handle File Input
    $fileInput.on('change', function () {
        filesArray = [...filesArray, ...Array.from(this.files)];
        renderFileList();
    });

    // Drag and Drop
    $dropZone.on('dragover', function (event) {
        event.preventDefault();
        $dropZone.addClass('hover');
    });

    $dropZone.on('dragleave', function () {
        $dropZone.removeClass('hover');
    });

    $dropZone.on('drop', function (event) {
        event.preventDefault();
        $dropZone.removeClass('hover');
        const droppedFiles = event.originalEvent.dataTransfer.files;
        filesArray = [...filesArray, ...Array.from(droppedFiles)];
        renderFileList();
    });

    // Upload Files
    $uploadButton.on('click', function () {
        if (filesArray.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'لم تقم برفع ملفات',
                text: 'يرجى اختيار ملفات قبل تأكيد الرفع!',
            });
            return;
        }

        const formData = new FormData();
        filesArray.forEach((file) => formData.append('files[]', file));

        // Simulate File Upload
        $.ajax({
            url: '/admin/upload',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: () => {
                Swal.fire({
                    title: 'جاري الرفع...',
                    html: 'يرجى الانتظار قليلاً.',
                    allowOutsideClick: false,
                    didOpen: () => Swal.showLoading(),
                });
            },
            success: (response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'تم الرفع بنجاح',
                    text: 'تم رفع الملفات إلى الخادم.',
                });
                filesArray = [];
                renderFileList();
            },
            error: function (xhr, status, error) {
                let errorMessage = "تعذر تحميل الملف";
                if (xhr.responseJSON) {
                    errorMessage = xhr.responseJSON;
                } else if (xhr.responseText) {
                    errorMessage = xhr.responseText;
                }

                Swal.fire({
                    title: "خطأ !",
                    text: errorMessage,
                    icon: "error"
                });
            },
        });
    });
});

$("#create-cert-btn").click(function (){
    $(this).hide();
    $("#create-cert-message").show();
});

/*(function() {
    function clearPage() {
        document.documentElement.innerHTML = ""; // مسح الصفحة بالكامل
    }

    function detectDevTools() {
        if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
            clearPage();
        }
    }

    setInterval(detectDevTools, 500);

    window.addEventListener('keydown', function(event) {
        if (
            event.key === 'F12' ||
            (event.ctrlKey && event.shiftKey && event.key === 'I') ||
            (event.ctrlKey && event.shiftKey && event.key === 'J') ||
            (event.ctrlKey && event.key === 'U')
        ) {
            clearPage();
        }
    });

    document.addEventListener('contextmenu', function(event) {
        setTimeout(() => {
            if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
                clearPage();
            }
        }, 100);
    });
})();*/
