import matplotlib.pyplot as plt
import numpy as np

def plot_letter_b(ax):
    ax.bar([0, 1], [2, 3], color=['#b2dfdb', '#80cbc4'])
    ax.set_xticks([])
    ax.set_yticks([])
    ax.set_frame_on(False)

def plot_letter_e(ax):
    ax.barh([0, 1], [2, 2], color=['#01579b', '#80cbc4'])
    ax.set_xticks([])
    ax.set_yticks([])
    ax.set_frame_on(False)

def plot_letter_h(ax):
    ax.plot([0, 0, 1, 1], [0, 2, 2, 0], color='#01579b', linewidth=3)
    ax.set_xticks([])
    ax.set_yticks([])
    ax.set_frame_on(False)

def plot_letter_j(ax):
    theta = np.linspace(0, np.pi, 100)
    x = np.cos(theta)
    y = np.sin(theta) - 1
    ax.plot(x, y, color='#01579b', linewidth=3)
    ax.plot([0, 0], [-1, -2], color='#01579b', linewidth=3)
    ax.set_xticks([])
    ax.set_yticks([])
    ax.set_frame_on(False)

def plot_letter_a(ax):
    ax.plot([0, 1, 2], [0, 3, 0], color='#b2dfdb', linewidth=3)
    ax.plot([0.5, 1.5], [1.5, 1.5], color='#80cbc4', linewidth=3)
    ax.set_xticks([])
    ax.set_yticks([])
    ax.set_frame_on(False)

def plot_letter_r(ax):
    ax.bar([0, 1], [2, 1], color=['#b2dfdb', '#80cbc4'])
    ax.plot([1, 1.5], [1, 0], color='#01579b', linewidth=3)
    ax.set_xticks([])
    ax.set_yticks([])
    ax.set_frame_on(False)

def plot_letter_t(ax):
    ax.plot([0, 1, 2], [2, 2, 2], color='#01579b', linewidth=3)
    ax.plot([1, 1], [2, 0], color='#01579b', linewidth=3)
    ax.set_xticks([])
    ax.set_yticks([])
    ax.set_frame_on(False)

def plot_letter_last_a(ax):
    ax.plot([0, 1, 2], [0, 3, 0], color='#80cbc4', linewidth=3)
    ax.plot([0.5, 1.5], [1.5, 1.5], color='#b2dfdb', linewidth=3)
    ax.set_xticks([])
    ax.set_yticks([])
    ax.set_frame_on(False)

fig, axes = plt.subplots(1, 8, figsize=(12, 3))

plot_letter_b(axes[0])
plot_letter_e(axes[1])
plot_letter_h(axes[2])
plot_letter_j(axes[3])
plot_letter_a(axes[4])
plot_letter_r(axes[5])
plot_letter_t(axes[6])
plot_letter_last_a(axes[7])

plt.subplots_adjust(wspace=0.5)
plt.show()
