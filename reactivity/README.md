grpcurl \
 --plaintext \
 -H 'x-reboot-service-name: reactive.v1.CMethods' \
 -H "x-reboot-state-ref: reactive.v1.C:C" \
 -format json \
 -d "{ \"c_state\": \"D\" }" \
 localhost:9991 \
 reactive.v1.CMethods/UpdateCState
