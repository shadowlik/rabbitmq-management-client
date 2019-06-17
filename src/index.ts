import axios, { AxiosAdapter, AxiosInstance, AxiosPromise, AxiosResponse, AxiosRequestConfig } from 'axios';

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
    putVhostExchange(vhost: string, exchangeName: string, data: string): AxiosPromise {
        return this.axios.put(`exchanges/${encodeURIComponent(vhost)}/${encodeURIComponent(exchangeName)}`, data);
    }

    /**
     *
     * @param vhost
     * @param exchangeName
     */
    deleteVhostExchange(vhost: string, exchangeName: string): AxiosPromise {
        return this.axios.delete(`exchanges/${encodeURIComponent(vhost)}/${encodeURIComponent(exchangeName)}`);
    }

    /**
     *
     * @param vhost
     * @param options
     */
    getVhostQueues(vhost: string, options: AxiosRequestConfig): AxiosPromise {
        return this.axios.get(`queues/${encodeURIComponent(vhost)}`, options);
    }

    /**
     *
     * @param vhost
     * @param queueName
     */
    getVhostQueue(vhost: string, queueName: string): AxiosPromise {
        return this.axios.get(`queues/${encodeURIComponent(vhost)}/${encodeURIComponent(queueName)}`);
    }

    /**
     *
     * @param vhost
     * @param queueName
     * @param data
     */
    putVhostQueue(vhost: string, queueName: string, data: string): AxiosPromise {
        return this.axios.put(`queues/${encodeURIComponent(vhost)}/${encodeURIComponent(queueName)}`, data);
    }

    /**
     *
     * @param vhost
     * @param queueName
     */
    deleteVhostQueue(vhost: string, queueName: string): AxiosPromise {
        return this.axios.delete(`queues/${encodeURIComponent(vhost)}/${encodeURIComponent(queueName)}`);
    }

    /**
     *
     * @param vhost
     * @param queueName
     */
    deleteVhostQueueContents(vhost: string, queueName: string) {
        return this.axios.delete(`queues/${encodeURIComponent(vhost)}/${encodeURIComponent(queueName)}/contents`);
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
    putVhost(vhost: string, body: string): AxiosPromise {
        return this.axios.put(`vhosts/${encodeURIComponent(vhost)}`, body);
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
    putUser(name: string, body: string): AxiosPromise {
        return this.axios.put(`users/${encodeURIComponent(name)}`, body);
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
    setUserPermissions(user: string, vhost: string, body: string): AxiosPromise {
        return this.axios.put('permissions/' + encodeURIComponent(vhost) + '/' + encodeURIComponent(user), body);
    }

    /**
     *
     */
    getCurrentUser(): AxiosPromise {
        return this.axios.get('whoami');
    }
}