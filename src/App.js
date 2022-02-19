import TeachablemachineCode from './components/TeachablemachineCode';
import CallToActionWithAnnotation from './components/CallToActionWithAnnotation'
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

function App() {

    return (
        <div>
            <CallToActionWithAnnotation />
            {/* <TeachablemachineCode /> */}
            <Link ml="600px" href='https://github.com/S-MW' isExternal>
            Developed by Saad <ExternalLinkIcon mx='2px' />
            </Link>
        </div>
    );
}

export default App;
