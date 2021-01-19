import http.server


class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_my_headers()
        http.server.SimpleHTTPRequestHandler.end_headers(self)

    def send_my_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")

    def send_error(self, code, message=None):
        if code == 404:
            with open('404.html', 'r') as file:
                self.error_message_format = file.read()
        else:
            self.error_message_format = """\
            <head>
            <title>Error response</title>
            </head>
            <body>
            <h1>Error response</h1>
            <p>Error code %(code)d.
            <p>Message: %(message)s.
            <p>Error code explanation: %(code)s = %(explain)s.
            </body>
            """

        http.server.SimpleHTTPRequestHandler.send_error(self, code, message)


if __name__ == '__main__':
    http.server.test(HandlerClass=MyHTTPRequestHandler)
