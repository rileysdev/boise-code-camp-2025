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
        return GetResponse(id=state.id, name=state.name, email=state.email)
        
    async def Set(
        self,
        context: WriterContext,
        state: Hello.State,
        request: SetRequest,
    ) -> SetResponse:
        state.id = request.id
        state.name = request.name
        state.email = request.email

        return SetResponse()
