import type { User } from '@prisma/client';
import { prisma } from '../prisma';

export async function getUserById(id: User['id']) {
	return prisma.user.findUnique({ where: { id } });
}

export async function getUsers() {
	return prisma.user.findMany();
}
