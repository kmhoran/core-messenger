import React, {Component} from 'react';

import CodeCampMenu from './codeCampMenu';
import PageTop from './pageTop';
import Footer from './footer';
import Routes from './routes';

class FullPage extends Component {

    constructor(props){
        super(props);
        this.handler = this.handler.bind(this);
    }

    handler(val) {
        this.props.action();
    }

    render() {
        return (
            <div>
                <PageTop>
                    <CodeCampMenu />
                </PageTop>
                <Routes action={this.handler} />
                <Footer />
            </div>
        );
    }
}

FullPage.defaultProps = {};

export default FullPage;