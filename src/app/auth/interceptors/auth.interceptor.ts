import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "@auth/services/auth.service";
import { environment } from "src/environments/environment";

const baseUrl = environment.baseUrl;

const UrlsWithAuth = [
  `${baseUrl}/auth/check-status`
]

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // Inject the current `AuthService` and use it to get an authentication token:
  const authToken = inject(AuthService).token();
  // Clone the request to add the authentication header.

  const requiereAuth = UrlsWithAuth.some(url => req.url.includes(url));

  if (requiereAuth) {
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${authToken}`),
    });
    return next(newReq);
  }

  // console.log(req.url)

  return next(req);

}
