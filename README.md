# RabbitMQ Management Client

> RabbitMQ NodeJS Management Client

# Postman Documentation

[API Documentation - Postman](https://documenter.getpostman.com/view/970586/S1ZxbpUw?version=latest)

# RabbitMQ Management HTTP API

## Introduction

Apart from this help page, all URIs will serve only resources of type `application/json`, and will require HTTP basic authentication (using the standard RabbitMQ user database). The default user is guest/guest.

Many URIs require the name of a virtual host as part of the path, since names only uniquely identify objects within a virtual host. As the default virtual host is called "`/`", this will need to be encoded as "`%2F`".

PUTing a resource creates it. The JSON object you upload must have certain mandatory keys (documented below) and may have optional keys. Other keys are ignored. Missing mandatory keys constitute an error.

Since bindings do not have names or IDs in AMQP we synthesise one based on all its properties. Since predicting this name is hard in the general case, you can also create bindings by POSTing to a factory URI. See the example below.

Many URIs return lists. Such URIs can have the query string parameters `sort` and `sort_reverse` added. `sort` allows you to select a primary field to sort by, and `sort_reverse` will reverse the sort order if set to `true`. The `sort` parameter can contain subfields separated by dots. This allows you to sort by a nested component of the listed items; it does not allow you to sort by more than one field. See the example below.

You can also restrict what information is returned per item with the `columns` parameter. This is a comma-separated list of subfields separated by dots. See the example below.

Most of the GET queries return many fields per object. See [the separate stats documentation](../doc/stats.html).

## Examples

A few quick examples for Windows and Unix, using the command line tool `curl`:

*   Get a list of vhosts:

    <pre>:: Windows
    C:\> curl -i -u guest:guest http://localhost:15672/api/vhosts

    # Unix
    $ curl -i -u guest:guest http://localhost:15672/api/vhosts

    HTTP/1.1 200 OK
    Server: MochiWeb/1.1 WebMachine/1.10.0 (never breaks eye contact)
    Date: Mon, 16 Sep 2013 12:00:02 GMT
    Content-Type: application/json
    Content-Length: 30

    [{"name":"/","tracing":false}]
    </pre>

*   Get a list of channels, fast publishers first, restricting the info items we get back:

    <pre>:: Windows
    C:\> curl -i -u guest:guest "http://localhost:15672/api/channels?sort=message_stats.publish_details.rate&sort_reverse=true&columns=name,message_stats.publish_details.rate,message_stats.deliver_get_details.rate"

    # Unix
    $ curl -i -u guest:guest 'http://localhost:15672/api/channels?sort=message_stats.publish_details.rate&sort_reverse=true&columns=name,message_stats.publish_details.rate,message_stats.deliver_get_details.rate'

    HTTP/1.1 200 OK
    Server: MochiWeb/1.1 WebMachine/1.10.0 (never breaks eye contact)
    Date: Mon, 16 Sep 2013 12:01:17 GMT
    Content-Type: application/json
    Content-Length: 219
    Cache-Control: no-cache

    [{"message_stats":{"publish_details":{"rate" _... (remainder elided)_</pre>

*   Create a new vhost:

    <pre>:: Windows
    C:\> curl -i -u guest:guest -H "content-type:application/json" ^
          -XPUT http://localhost:15672/api/vhosts/foo

    # Unix
    $ curl -i -u guest:guest -H "content-type:application/json" \
       -XPUT http://localhost:15672/api/vhosts/foo

    HTTP/1.1 204 No Content
    Server: MochiWeb/1.1 WebMachine/1.10.0 (never breaks eye contact)
    Date: Mon, 16 Sep 2013 12:03:00 GMT
    Content-Type: application/json
    Content-Length: 0</pre>

    Note: you must specify `application/json` as the mime type.

    Note: the name of the object is not needed in the JSON object uploaded, since it is in the URI. As a virtual host has no properties apart from its name, this means you do not need to specify a body at all!

*   Create a new exchange in the default virtual host:

    <pre>:: Windows
    C:\> curl -i -u guest:guest -H "content-type:application/json" ^
           -XPUT -d"{""type"":""direct"",""durable"":true}" ^
           http://localhost:15672/api/exchanges/%2F/my-new-exchange

    # Unix
    $ curl -i -u guest:guest -H "content-type:application/json" \
        -XPUT -d'{"type":"direct","durable":true}' \
        http://localhost:15672/api/exchanges/%2F/my-new-exchange

    HTTP/1.1 204 No Content
    Server: MochiWeb/1.1 WebMachine/1.10.0 (never breaks eye contact)
    Date: Mon, 16 Sep 2013 12:04:00 GMT
    Content-Type: application/json
    Content-Length: 0</pre>

    Note: we never return a body in response to a PUT or DELETE, unless it fails.

*   And delete it again:

    <pre>:: Windows
    C:\> curl -i -u guest:guest -H "content-type:application/json" ^
           -XDELETE http://localhost:15672/api/exchanges/%2F/my-new-exchange

    # Unix
    $ curl -i -u guest:guest -H "content-type:application/json" \
        -XDELETE http://localhost:15672/api/exchanges/%2F/my-new-exchange

    HTTP/1.1 204 No Content
    Server: MochiWeb/1.1 WebMachine/1.10.0 (never breaks eye contact)
    Date: Mon, 16 Sep 2013 12:05:30 GMT
    Content-Type: application/json
    Content-Length: 0</pre>
