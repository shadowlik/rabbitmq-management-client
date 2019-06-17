import axios, { AxiosAdapter, AxiosInstance, AxiosPromise, AxiosResponse } from 'axios';

interface Options {
    timeout?: number;
}

export default class RabbitStats {
    uri: string;
    user: string;
    pass: string;
    axios: AxiosInstance;

    /**
     *
     * @param uri RabbitMQ Management Host (Default: http://localhost:15672)
     * @param user RabbitMQ Management User (Default: guest)
     * @param pass RabbitMQ Management Password (Default: Guest)
     */
    constructor(uri: string = 'http://localhost:15672', user: string = 'guest', pass: string = 'guest', options: Options = {}) {
        this.uri  = `${uri}/api/`;
        this.user = user;
        this.pass = pass;

        // Axios
        this.axios = axios.create({
            baseURL: this.uri,
            timeout: options.timeout || 1000,
            headers: {
                'content-type': 'application/json'
            },
            auth: {
                username: this.user,
                password: this.pass,
            },
        });
    }


    /**
     * Various random bits of information that describe the whole system.
     */
    getOverview = this.axios.get('overview');

    /**
     * A list of extensions to the management plugin.
     */
    getExtensions = this.axios.get('extensions');

     /**
     * A list of nodes in the RabbitMQ cluster.
     */
    getNodes = this.axios.get('nodes');

    /**
     * An individual node in the RabbitMQ cluster. Add "?memory=true" to get memory statistics, and "?binary=true" to get a breakdown of binary memory use (may be expensive if there are many small binaries in the system).
     * @param name
     */
    getNode(name: string): AxiosPromise {
        return this.axios.get(`nodes/${encodeURIComponent(name)}`);
    }

    /**
     * A list of all open connections.
     */
    getConnections = this.axios.get('connections');

    /**
     * An individual connection.
     * @param name
     */
    getConnection(name: string): AxiosPromise {
        return this.axios.get(`connections/${encodeURIComponent(name)}`);
    }

    /**
     * DELETEing it will close the connection. Optionally set the "X-Reason" header when DELETEing to provide a reason.
     * @param name
     */
    deleteConnection(name: string): AxiosPromise {
        return this.axios.delete(`connections/${encodeURIComponent(name)}`);
    }

    /**
     * List of all channels for a given connection.
     * @param name
     */
    getConnectionChannels(name: string): AxiosPromise {
        return this.axios.get(`connections/${encodeURIComponent(name)}/channels`);
    }

    /**
     * A list of all open channels.
     */
    getChannels = this.axios.get('channels');

    /**
     * Details about an individual channel.
     * @param name
     */
    getChannel(name: string): AxiosPromise {
        return this.axios(`channels/${encodeURIComponent(name)}`);
    }

    /**
     * A list of all consumers.
     */
    getConsumers = this.axios.get('consumers');

    /**
     * A list of all queues.
     */
    getQueues = this.axios.get('queues');

    /**
     * A list of all bindings.
     */
    getBindings = this.axios.get('bindings');

    /**
     * A list of all users.
     */
    getUsers = this.axios.get('users');

    /**
     * A list of all policies.
     */
    getPolicies = this.axios.get('policies');

    /**
     * A list of all vhosts.
     */
    getVhosts = this.axios.get('vhosts');

    /**
     * A list of all consumers in a given virtual host.
     * @param vhost
     */
    getVhostConsumers(vhost: string): AxiosPromise {
        return this.axios.get(`consumers/${encodeURIComponent(vhost)}`);
    }

    /**
     * A list of all exchanges.
     */
    getExchanges = this.axios.get('exchanges');


    /**
     * A list of all exchanges in a given virtual host.
     * @param vhost
     */
    getVhostExchanges(vhost: string) {
        return this.axios.get(`exchanges/${encodeURIComponent(vhost)}`)
    }

    /**
     * An individual exchange. To PUT an exchange, you will need a body looking something like this:
     * @param vhost
     * @param exchangeName
     */
    getVhostExchange(vhost: string, exchangeName: string): AxiosPromise {
        return this.axios.get(`exchanges/${encodeURIComponent(vhost)}/${encodeURIComponent(exchangeName)}`);
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
    getVhostBindings(vhost: string): AxiosPromise {
        return this.axios.get(`bindings/${encodeURIComponent(vhost)}`)
    }

    /**
     *
     * @param vhost
     */
    getVhost(vhost: string): AxiosPromise {
        return this.axios.get(`vhosts/${encodeURIComponent(vhost)}`);
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
    deleteVhost(vhost: string): AxiosPromise {
        return this.axios.delete(`vhosts/${encodeURIComponent(vhost)}`);
    }

    /**
     *
     * @param name
     */
    getUser(name: string): AxiosPromise {
        return this.axios.get(`users/${encodeURIComponent(name)}`)
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
    deleteUser(name: string): AxiosPromise {
        return this.axios.delete(`users/${encodeURIComponent(name)}`);
    }

    /**
     *
     * @param name
     */
    getUserPermissions(name: string): AxiosPromise {
        return this.axios.get(`users/${encodeURIComponent(name)}/permissions`)
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
    getCurrentUser(): AxiosPromise {
        return this.axios.get('whoami');
    }
}