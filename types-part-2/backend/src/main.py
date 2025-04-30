import asyncio
import logging
from user.v1.user_rbt import User
from user_servicer import UserServicer
from reboot.aio.applications import Application
from reboot.aio.external import ExternalContext

logging.basicConfig(level=logging.INFO)

STARTER_USER_ID = 'reboot-user'


async def initialize(context: ExternalContext):
    user = User.ref(STARTER_USER_ID)

    # Implicitly construct state machine upon first write.
    await user.idempotently().Set(
        context,
        id=1,
        name='Alice Wonderland',
        email='alice@example.com'
    )

    logging.info('👋 Hello, World? Hello, Reboot! 👋')


async def main():
    await Application(
        servicers=[UserServicer],
        initialize=initialize,
    ).run()


if __name__ == '__main__':
    asyncio.run(main())
