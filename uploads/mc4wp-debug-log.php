<?php exit; ?>
[2019-03-22 19:09:26] ERROR: Form 66 > Mailchimp API error: 400 Bad Request. Invalid Resource. test@gm***.com looks fake or invalid, please enter a real email address.
Request: PUT https://us17.api.mailchimp.com/3.0/lists/2a4312176e/members/1aedb8d9dc4751e229a335e371db8058 - {"email_address":"test@gm***.com","interests":{},"merge_fields":{},"status":"pending","email_type":"html","ip_signup":"127.0.0.1","tags":[]}
Response: 400 Bad Request - {"type":"http://developer.mailchimp.com/documentation/mailchimp/guides/error-glossary/","title":"Invalid Resource","status":400,"detail":"test@gm***.com looks fake or invalid, please enter a real email address.","instance":"65e000d8-2570-4631-b54a-154a409d9926"}
