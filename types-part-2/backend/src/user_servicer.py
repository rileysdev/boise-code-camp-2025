from user.v1.user_rbt import (
    User,
    GetRequest,
    GetResponse,
    SetRequest,
    SetResponse,
)
from reboot.aio.auth.authorizers import allow
from reboot.aio.contexts import ReaderContext, WriterContext


class UserServicer(User.Servicer):

    def authorizer(self):
        return allow()

    async def Get(
        self,
        context: ReaderContext,
        state: User.State,
        request: GetRequest,
    ) -> GetResponse:
        return GetResponse(
            user_id=state.user_id, 
            name=state.name, 
            email=state.email
        )
        
    async def Set(
        self,
        context: WriterContext,
        state: User.State,
        request: SetRequest,
    ) -> SetResponse:
        if request.user_id:
            state.user_id = request.user_id
        if request.name:
            state.name = request.name
        if request.email:
            state.email = request.email

        return SetResponse()
