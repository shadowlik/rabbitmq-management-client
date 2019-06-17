import axios from 'axios';

class RabbitStats {
    uri: string;
    user: string;
    pass: string;
    options: {};

    /**
     *
     * @param uri RabbitMQ Management Host (Default: http://localhost:15672)
     * @param user RabbitMQ Management User (Default: guest)
     * @param pass RabbitMQ Management Password (Default: Guest)
     */
    constructor(uri: string = 'http://localhost:15672', user: string = 'guest', pass: string = 'guest') {
        this.uri  = `${uri}/api/`;
        this.user = user;
        this.pass = pass;

        // Options
        this.options =  {
            uri: this.uri,
            json: true,
            gzip: true,
            auth: {
                user: this.user,
                pass: this.pass,
                sendImmediately: false
            },
            headers: {
                'content-type': 'application/json'
            }
        };
    }

    /**
     *
     * @param method HTTP Method
     * @param path Path
     * @param query Query
     * @param body Body
     */
    private request(method: string, path: string, query?: string, body?: string) {

    }

    /**
     *
     */
    getOverview = this.request('GET', 'overview');

    /**
     *
     */
    getExtensions = this.request('GET', 'extensions');

     /**
     *
     */
    getNodes = this.request('GET', 'nodes');


    /**
     *
     * @param name
     */
    getNode(name: string) {
        name = encodeURIComponent(name);
        return this.request('GET', 'nodes/' + name);
    }

    /**
     *
     */
    getConnections = this.request('GET', 'connections');

    /**
     *
     * @param name
     */
    getConnection(name: string) {
        name = encodeURIComponent(name);
        return this.request('GET', 'connections/' + name);
    }

    /**
     *
     * @param name
     */
    deleteConnection(name: string) {
        name = encodeURIComponent(name);
        return this.request('DELETE', 'connections/' + name);
    }

    /**
     *
     * @param name
     */
    getConnectionChannels(name: string) {
        name = encodeURIComponent(name);
        return this.request('GET', 'connections/' + name + '/channels');
    }

    /**
     *
     */
    getChannels = this.request('GET', 'channels');

    /**
     *
     * @param name
     */
    getChannel(name: string) {
        name = encodeURIComponent(name);
        return this.request('GET', 'channels/' + name);
    }

    /**
     *
     */
    getConsumers = this.request('GET', 'consumers');

    /**
     *
     */
    getQueues = this.request('GET', 'queues');

    /**
     *
     */
    getBindings = this.request('GET', 'bindings');

    /**
     *
     */
    getUsers = this.request('GET', 'users');

    /**
     *
     */
    getPolicies = this.request('GET', 'policies');

    /**
     *
     */
    getVhosts = this.request('GET', 'vhosts');

    /**
     *
     * @param vhost
     */
    getVhostConsumers(vhost: string) {
        vhost = encodeURIComponent(vhost);
        return this.request('GET', 'consumers/' + vhost);
    }

    /**
     *
     */
    getExchanges = this.request('GET', 'exchanges');


    /**
     *
     * @param vhost
     */
    getVhostExchanges(vhost: string) {
        vhost = encodeURIComponent(vhost);
        return this.request('GET', 'exchanges/' + vhost);
    }

    /**
     *
     * @param vhost
     * @param exchangeName
     */
    getVhostExchange(vhost: string, exchangeName: string) {
        vhost = encodeURIComponent(vhost);
        return this.request('GET', 'exchanges/' + vhost + '/' + exchangeName);
    }

    /**
     *
     * @param vhost
     * @param exchangeName
     * @param data
     */
    putVhostExchange(vhost: string, exchangeName: string, data: string) {
        vhost = encodeURIComponent(vhost);
        exchangeName = encodeURIComponent(exchangeName);
        return this.request('PUT', 'exchanges/' + vhost + '/' + exchangeName, null, data);
    }

    /**
     *
     * @param vhost
     * @param exchangeName
     */
    deleteVhostExchange(vhost: string, exchangeName: string) {
        vhost = encodeURIComponent(vhost);
        exchangeName = encodeURIComponent(exchangeName);
        return this.request('DELETE', 'exchanges/' + vhost + '/' + exchangeName);
    }

    /**
     *
     * @param vhost
     * @param options
     */
    getVhostQueues(vhost: string, options: string) {
        vhost = encodeURIComponent(vhost);
        return this.request('GET', 'queues/' + vhost, options);
    }

    /**
     *
     * @param vhost
     * @param queueName
     */
    getVhostQueue(vhost: string, queueName: string) {
        vhost = encodeURIComponent(vhost);
        queueName = encodeURIComponent(queueName);
        return this.request('GET', 'queues/' + vhost + '/' + queueName);
    }

    /**
     *
     * @param vhost
     * @param queueName
     * @param data
     */
    putVhostQueue(vhost: string, queueName: string, data: string) {
        vhost = encodeURIComponent(vhost);
        queueName = encodeURIComponent(queueName);
        return this.request('PUT', 'queues/' + vhost + '/' + queueName, null, data);
    }

    /**
     *
     * @param vhost
     * @param queueName
     */
    deleteVhostQueue(vhost: string, queueName: string) {
        vhost = encodeURIComponent(vhost);
        queueName = encodeURIComponent(queueName);
        return this.request('DELETE', 'queues/' + vhost + '/' + queueName);
    }

    /**
     *
     * @param vhost
     * @param queueName
     */
    deleteVhostQueueContents(vhost: string, queueName: string) {
        vhost = encodeURIComponent(vhost);
        queueName = encodeURIComponent(queueName);
        return this.request('DELETE', 'queues/' + vhost + '/' + queueName + '/contents');
    }

    /**
     *
     * @param vhost
     */
    getVhostBindings(vhost: string) {
        vhost = encodeURIComponent(vhost);
        return this.request('GET', 'bindings/' + vhost);
    }

    /**
     *
     * @param vhost
     */
    getVhost(vhost: string) {
        vhost = encodeURIComponent(vhost);
        return this.request('GET', 'vhosts/' + vhost);
    }

    /**
     *
     * @param vhost
     * @param body
     */
    putVhost(vhost: string, body: string) {
        vhost = encodeURIComponent(vhost);
        return this.request('PUT', 'vhosts/' + vhost, null, body);
    }

    /**
     *
     * @param vhost
     */
    deleteVhost(vhost: string) {
        vhost = encodeURIComponent(vhost);
        return this.request('DELETE', 'vhosts/' + vhost);
    }

    /**
     *
     * @param name
     */
    getUser(name: string) {
        name = encodeURIComponent(name);
        return this.request('GET', 'users/' + name);
    }

    /**
     *
     * @param name
     * @param body
     */
    putUser(name: string, body: string) {
        name = encodeURIComponent(name);
        return this.request('PUT', 'users/' + name, null, body);
    }

    /**
     *
     * @param name
     */
    deleteUser(name: string) {
        name = encodeURIComponent(name);
        return this.request('DELETE', 'users/' + name);
    }

    /**
     *
     * @param name
     */
    getUserPermissions(name: string) {
        name = encodeURIComponent(name);
        return this.request('GET', 'users/' + name + '/permissions');
    }

    /**
     *
     * @param user
     * @param vhost
     * @param body
     */
    setUserPermissions(user: string, vhost: string, body: string) {
        vhost = encodeURIComponent(vhost);
        user = encodeURIComponent(user);
        return this.request('PUT', 'permissions/' + vhost + '/' + user, null, body);
    }

    /**
     *
     */
    getCurrentUser() {
        return this.request('GET', 'whoami');
    }



}