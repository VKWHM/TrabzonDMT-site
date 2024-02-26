<?php

namespace App\Security;

use App\Repository\ApiTokenRepository;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Http\AccessToken\AccessTokenHandlerInterface;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;

readonly class AccessTokenHandler implements AccessTokenHandlerInterface
{

    public function __construct(
        private ApiTokenRepository $apiTokenRepository
    ) {
    }

    public function getUserBadgeFrom(#[\SensitiveParameter] string $accessToken): UserBadge
    {
        $accessToken = $this->apiTokenRepository->findOneBy(['token' => $accessToken]);
        if ($accessToken === null or !$accessToken->isValid()) {
            throw new BadCredentialsException('Invalid access token');
        }

        return new UserBadge($accessToken->getUser()->getUserIdentifier());
    }

}